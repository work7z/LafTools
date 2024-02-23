// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import fs from "fs";
import path from "path";
import loadDAO, { } from "../dao";
import { ChatGroup, ChatGroupAliasMap, ChatGroupHistory, ChatGroupUser, RawFTSChatroom, RawGroupHistory, RawWXContact, User } from "../dao/model";
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTypes, Model, Op } from 'sequelize'
import { isTestEnv, markEnvAsDevForcibly } from "../hooks/env";
import * as csv from 'fast-csv';
import _, { find } from "lodash";
import moment from "moment";

export type RawGroupMemberLogCount = {
  actualGroupAlias: string;
  sender: string;
  nickName: string;
  msgCount: number;
  firstHelloTime: string;
  lastByeTime: string;
}



test('chat-raw2crt', async () => {
  let checkUserIdObj = {}
  try {
    markEnvAsDevForcibly()
    if (isTestEnv()) {
      console.log('ignore test env')
      return;
    }
    let daoRef = await loadDAO()
    await ChatGroup.truncate({ force: true })
    await ChatGroupUser.truncate({ force: true })
    await ChatGroupHistory.truncate({ force: true })
    await ChatGroupAliasMap.truncate({ force: true })
    console.log(daoRef.db)
    let offset = 0, limits = 1000;
    // get chat group history batch records
    while (true) {
      let historyRecords = await RawGroupHistory.findAll({
        offset,
        limit: limits
      })
      if (historyRecords.length == 0) {
        break;
      }
      offset += limits;
      for (let eachRecord of historyRecords) {
        let { groupName, sender, strTime, strContent } = eachRecord;
        let actualStrTime: Date = moment(strTime, 'YYYY-MM-DD HH:mm:ss').toDate()
        // check group name
        let groupObj = await ChatGroup.findOne({
          where: {
            name: groupName
          }
        })
        if (groupObj == null) {
          groupObj = await ChatGroup.create({
            name: groupName,
            totalMsgCount: 0,
            firstMessageAt: actualStrTime,
          })
        }
        // check user
        let expUserId = -1
        let isNotEmptySender = !_.isEmpty(sender) && sender.indexOf('@chatroom') == -1
        let findGroupUserObj: ChatGroupUser | null = null;
        if (isNotEmptySender) {
          let rawUserObj: RawWXContact | null = await RawWXContact.findOne({
            where: {
              [Op.or]: [
                {
                  UserName: sender
                },
                {
                  Alias: sender
                }
              ]
            }
          })
          if (rawUserObj != null) {
            let findAlias = _.trim(rawUserObj.Alias) == '' ? rawUserObj.UserName : rawUserObj.Alias
            findGroupUserObj = await ChatGroupUser.findOne({
              where: {
                wxUserAlias: findAlias,
              }
            })
            if (findGroupUserObj == null) {
              findGroupUserObj = await ChatGroupUser.create({
                wxUserAlias: findAlias,
                wxNickName: rawUserObj.NickName,
                wxUserId: _.startsWith(rawUserObj.UserName, 'wxid_') ? rawUserObj.UserName : undefined,
                msgCount: 0,
                firstMessageAt: actualStrTime,
              })
            }
          } else {
            // throw new Error('no raw user for ' + sender)
            expUserId = -2
          }
        }
        if (!groupObj.id) {
          throw new Error('no group id for ' + groupName)
        }
        if (findGroupUserObj) {
          let getMinDate = (a?: Date, b?: Date) => {
            if (a == null) {
              return b;
            }
            if (b == null) {
              return a;
            }
            return a < b ? a : b;
          }
          let getMaxDate = (a?: Date, b?: Date) => {
            if (a == null) {
              return b;
            }
            if (b == null) {
              return a;
            }
            return a > b ? a : b;
          }
          // update msg count
          await findGroupUserObj?.update({
            msgCount: (findGroupUserObj?.msgCount || 0) + 1,
            firstMessageAt: getMinDate(findGroupUserObj.firstMessageAt, actualStrTime),
            lastMessageAt: getMaxDate(findGroupUserObj.lastMessageAt, actualStrTime),
          })
          // check user alias
          if (checkUserIdObj[findGroupUserObj.wxUserAlias] == null) {
            checkUserIdObj[findGroupUserObj.wxUserAlias] = 1
            let rawChatRoomItems = await RawFTSChatroom.findAll({
              where: {
                c2alias: findGroupUserObj.wxUserAlias,
              }
            })
            for (let eachItem of rawChatRoomItems) {
              if (_.isEmpty(eachItem.c0groupRemark)) {
                continue;
              }
              await ChatGroupAliasMap.create({
                groupUserId: findGroupUserObj.id || -1,
                groupAlias: eachItem.c0groupRemark,
              })
            }
          }
        }
        if (groupObj) {
          await groupObj?.update({
            totalMsgCount: (groupObj?.totalMsgCount || 0) + 1,
            lastMessageAt: actualStrTime,
          })
        }
        await ChatGroupHistory.create({
          groupId: groupObj.id,
          groupUserId: findGroupUserObj ? findGroupUserObj.id || expUserId : expUserId,
          sentTime: actualStrTime,
          content: strContent,
          type: eachRecord.type,
        })
      }
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}, { timeout: 1000000 * 99 })

test('chat2GetReport', async () => {
  try {
    markEnvAsDevForcibly()
    if (isTestEnv()) {
      console.log('ignore test env')
      return;
    }
    let daoRef = await loadDAO()
    console.log(daoRef.db)
    let [_rows, metadata] = await daoRef.db.query(`			select sender1,min(sender) as sender, min(nickName) as nickName ,count(*) as msgCount,min(strTime) firstHelloTime, max(strTime) lastByeTime from (
				select a.sender as sender1, a.* from raw_group_history a where sender != ''
			) ia group by sender1 order by firstHelloTime`, {
      mapToModel: true,
    })
    let rows: RawGroupMemberLogCount[] = _rows as any
    for (let row of rows) {
      // console.log('row', row)
      let actualGroupAlias: string | null = "Default"
      let ackAnyGroupAlias = false;

      let { sender } = row;
      let o1 = await RawFTSChatroom.findOne({
        where: {
          [Op.and]: {
            c2alias: {
              [Op.eq]: sender
            },
            c0groupRemark: {
              [Op.ne]: ''
            }
          }
        }
      })
      if (o1 != null) {
        ackAnyGroupAlias = true;
        actualGroupAlias = o1.c0groupRemark
      } else {
        // select min(username) from raw_wx_contact iwc where iwc.alias = a.c2alias or iwc.username = a.c2alias
        let o2 = await RawWXContact.findOne({
          where: {
            UserName: row.sender
          }
        })
        if (o2 == null || _.isEmpty(o2.Alias)) {
          actualGroupAlias = 'Unknown User'
        } else {
          let o3 = await RawFTSChatroom.findOne({
            where: {
              [Op.and]: {
                c2alias: {
                  [Op.eq]: o2.Alias
                },
                c0groupRemark: {
                  [Op.ne]: ''
                }
              }
            }
          })
          if (o3 != null) {
            ackAnyGroupAlias = true;
            actualGroupAlias = o3.c0groupRemark
          } else {
            actualGroupAlias = o2.NickName
          }
        }
      }

      console.log('nickname', row.nickName)
      console.log('username->', actualGroupAlias)
    }
  } catch (e) {
    console.log(e)
    throw e;
  }
}, { timeout: 1000000 * 99 })


test('chat2RAWdb2', async () => {
  try {
    markEnvAsDevForcibly()
    if (isTestEnv()) {
      console.log('ignore test env')
      return;
    }
    markEnvAsDevForcibly()
    let dir = "C:\\Users\\jerrylai\\hmproject\\elb3-wechat\\聊天记录";
    let ftsChatroomtJSON = path.join(dir, '..', 'FTSChatroom.json')
    let wxContactJSON = path.join(dir, '..', 'WXContact.json')
    let ftsRecords: RawFTSChatroom[] = JSON.parse(fs.readFileSync(ftsChatroomtJSON, 'utf8').toString())
    let wxContacts: RawWXContact[] = JSON.parse(fs.readFileSync(wxContactJSON, 'utf8').toString())
    let daoRef = await loadDAO();
    console.log(daoRef.db)
    let groupKey = '20240215'
    let groupFolders = fs.readdirSync(dir)
    await RawFTSChatroom.truncate({ force: true })
    // fts records
    for (let eachRecord of ftsRecords) {
      let m = await RawFTSChatroom.create({
        ...eachRecord,
        groupKey: groupKey
      })
      console.log(m)
    }
    await RawWXContact.truncate({ force: true })
    // raw wx contacts
    for (let eachContact of wxContacts) {
      let m = await RawWXContact.create({
        ...eachContact,
        groupKey: groupKey
      })
      console.log(m)
    }
    // group folders
    await RawGroupHistory.truncate({ force: true })
    for (let eachGroupFolderName of groupFolders) {
      let csvFile = path.join(dir, eachGroupFolderName, `${eachGroupFolderName}_utf8.csv`)
      console.log(csvFile)
      // get file length
      let fileStat = fs.statSync(csvFile)
      console.log(fileStat.size)
      let groupName = eachGroupFolderName
      // csv reader
      let allRows: any[] = []
      await new Promise((r, e) => {
        fs.createReadStream(csvFile)
          .pipe(csv.parse({ headers: true }))
          .on('error', error => {
            console.error(error)
            e(error)
          })
          .on('data', row => {
            allRows.push(row)
          })
          .on('end', (rowCount: number) => {
            console.log(`Parsed ${rowCount} rows`)
            r(1)
          });
      })
      for (let eachRow of allRows) {
        let formatRow = {}
        _.forEach(eachRow, (x, d, n) => {
          formatRow[_.trim(_.lowerFirst(d))] = x;
        })
        let m = await RawGroupHistory.create({
          groupKey,
          groupName,
          ...formatRow as any,
        } as any)
        console.log(m)
      }
    }
  } catch (e) {
    console.log(e)
    throw e;
  }
}, { timeout: 1000000 * 99 })



