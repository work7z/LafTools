import {
    Sequelize, DataTypes, Model, InferCreationAttributes, InferAttributes, CreationOptional
} from 'sequelize';
import { DaoRef } from './index'
import { isDevEnv } from '../hooks/env';

export const DB_VERSION = "v2"

// chat group, chat group members, chat group history



// model for chat group
export class ChatGroup extends Model<InferAttributes<ChatGroup>, InferCreationAttributes<ChatGroup>> {
    declare id?: number;
    declare name: string;
    declare totalMsgCount: number;
    declare firstMessageAt?: Date;
    declare lastMessageAt?: Date;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

// model for chat group members 
export class ChatGroupUser extends Model<InferAttributes<ChatGroupUser>, InferCreationAttributes<ChatGroupUser>> {
    declare id?: number;
    declare wxUserId?: string;
    declare wxUserAlias: string;
    declare wxNickName: string;
    declare msgCount: number;
    declare firstMessageAt?: Date;
    declare lastMessageAt?: Date;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

export class ChatGroupAliasMap extends Model<InferAttributes<ChatGroupAliasMap>, InferCreationAttributes<ChatGroupAliasMap>> {
    declare id?: number;
    declare groupUserId: number;
    declare groupAlias: string;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

// model for chat group history
export class ChatGroupHistory extends Model<InferAttributes<ChatGroupHistory>, InferCreationAttributes<ChatGroupHistory>> {
    declare id?: number;
    declare groupId: number;
    declare groupUserId: number;
    declare type: string; // 10000 or other types
    declare content: string;
    declare sentTime: Date;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

export class RawWXContact extends Model<InferAttributes<RawWXContact>, InferCreationAttributes<RawWXContact>> {
    declare id: number;
    declare groupKey: string;

    declare UserName: string;
    declare Alias: string;
    declare EncryptUserName: string;
    declare DelFlag: number;
    declare Type: number;
    declare VerifyFlag: number;
    declare Reserved1: number;
    declare Reserved2: number;
    declare Reserved3: string;
    declare Reserved4: string;
    declare Remark: string;
    declare NickName: string;
    declare LabelIDList: string;
    declare DomainList: string;
    declare ChatRoomType: number;
    declare PYInitial: string;
    declare QuanPin: string;
    declare RemarkPYInitial: string;
    declare RemarkQuanPin: string;
    declare BigHeadImgUrl: string;

}

export class RawFTSChatroom extends Model<InferAttributes<RawFTSChatroom>, InferCreationAttributes<RawFTSChatroom>> {
    declare docid: number;
    declare groupKey: string;
    declare c0groupRemark: string;
    declare c1nickname: string;
    declare c2alias: string;
}

export class RawGroupHistory extends Model<InferAttributes<RawGroupHistory>, InferCreationAttributes<RawGroupHistory>> {
    // localId,TalkerId,Type,SubType,IsSender,CreateTime,Status,StrContent,StrTime,Remark,NickName,Sender
    declare id: number;
    declare groupKey: string;
    declare groupName: string;
    declare localId: string;
    declare talkerId: string;
    declare type: string;
    declare subType: string;
    declare isSender: string;
    declare createTime: string;
    declare status: string;
    declare strContent: string;
    declare strTime: string;
    declare remark: string;
    declare nickName: string;
    declare sender: string;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}



// system forum

export type UserRole = "webmaster" | "moderator" | "user"

export class SMSCodeRecord extends Model<InferAttributes<SMSCodeRecord>, InferCreationAttributes<SMSCodeRecord>> {
    declare id: number;
    declare userAcctId: string;
    declare phoneNumber: string;
    declare code: string;
    declare dateValue: string;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

export class InvitationCode extends Model<InferAttributes<InvitationCode>, InferCreationAttributes<InvitationCode>> {
    declare id: number | null;
    declare code: string;
    declare maxUseCount: number;
    declare useCount: number;
    declare expiredAt: Date;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: number | null;
    declare userAcctId: string; // unique text id, can not be changed
    declare username?: string; // can be changed at any time, can be duplicate
    declare uid?: number | null;
    declare invitationCode: string;
    declare phoneNumber: string;
    declare vcode?: string;
    declare email?: string;
    declare source?: string;
    declare password: string;
    declare role: UserRole;
    declare avatarPath?: string;
    declare status: "newly-created" | "normal" | "banned" | "deleted";
    declare topicCount: number; // the number of topics that's sent by this user up to now
    declare replyCount: number;
    declare banReason?: string | null; // the reason why this user is banned
    declare banUntil?: Date | null;
    // settings
    declare cityId?: string; // city id, from fixed static data in node.js
    declare goal?: string; // goal, from fixed static data in node.js

    // timestamps
    declare createdAt?: CreationOptional<Date> | null;
    declare updatedAt?: CreationOptional<Date> | null;
    declare deleteAt?: CreationOptional<Date> | null;
}

// model for UserToken
export class UserToken extends Model<InferAttributes<UserToken>, InferCreationAttributes<UserToken>> {
    declare id: number;
    declare userId: number;
    declare token: string;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

// model for UserLoginLog
export class UserLoginLog extends Model<InferAttributes<UserLoginLog>, InferCreationAttributes<UserLoginLog>> {
    declare id?: number;
    declare userId: number;
    declare loginIp: string;
    declare loginTime: Date;
}

// model for block amongst users
export class Block extends Model<InferAttributes<Block>, InferCreationAttributes<Block>> {
    declare id: number;
    declare userId: number;
    declare blockUserId: number;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

// model for topic, containing title, userid, nodeid
export class Topic extends Model<InferAttributes<Topic>, InferCreationAttributes<Topic>> {
    declare id: number;
    declare title: string; // varchar(120)
    declare userId: string;
    declare nodeId: string; // varchar(15)
    declare viewCount: number;
    declare favouriteCount: number;
    declare commentCount: number;
    declare lastCommenter: number;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

// model for topic content, including topicId, type, content(varchar(200))
export class TopicContent extends Model<InferAttributes<TopicContent>, InferCreationAttributes<TopicContent>> {
    declare id: number;
    declare topicId: number;
    declare publishType: "main" | "append";
    declare renderType: "markdown" | "lexical";
    declare content: string; // varchar(20000)
    declare editTimes: number;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

// model for topic comments, including topicId, userId, content
export class TopicComment extends Model<InferAttributes<TopicComment>, InferCreationAttributes<TopicComment>> {
    declare id: number;
    declare topicId: number;
    declare userId: number;
    declare content: string; // varchar(20000)
    declare editTimes: number;
    declare agreeCount: number; // agree with this comment, visible
    declare disagreeCount: number; // disagree with this comment, invisible
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

// model for audit table, can contains history of topic content and topic comment model
export type AuditType = "editTopicContent" | "editTopicComment" | "changeUserName"
export class Audit extends Model<InferAttributes<Audit>, InferCreationAttributes<Audit>> {
    declare id: number;
    declare userId: number;
    declare type: AuditType;
    declare content: string; // varchar(20000)
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}


export default async (daoRef: DaoRef) => {
    let sequelize = daoRef.db
    // init model
    await InvitationCode.init({
        useCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        maxUseCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expiredAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            autoIncrementIdentity: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "InvitationCode",
        tableName: "invitation_code"
    })
    await User.init({
        replyCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vcode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userAcctId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            autoIncrementIdentity: true,
        },
        uid: { // meaning user unique id. if it's null, then it's not an activated account.
            type: DataTypes.INTEGER,
            allowNull: true,
            // unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        source: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        invitationCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        avatarPath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topicCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        banReason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        banUntil: {
            type: DataTypes.DATE,
            allowNull: true
        },
        cityId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        goal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "User",
        tableName: "user"
    })
    await UserToken.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "UserToken",
        tableName: "user_token"
    })
    await UserLoginLog.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        loginIp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        loginTime: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "UserLoginLog",
        tableName: "user_login_log"
    })
    await Block.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        blockUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "Block",
        tableName: "block"
    })
    await Topic.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nodeId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        viewCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        favouriteCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        commentCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lastCommenter: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "Topic",
        tableName: "topic"
    })
    await TopicContent.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        publishType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        renderType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        editTimes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "TopicContent",
        tableName: "topic_content"
    })
    await TopicComment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        editTimes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        agreeCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        disagreeCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "TopicComment",
        tableName: "topic_comment"
    })
    await Audit.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "Audit",
        tableName: "audit"
    })

    await ChatGroup.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalMsgCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        firstMessageAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        lastMessageAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "ChatGroup",
        tableName: "chat_group"
    })
    await ChatGroupUser.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        wxUserId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        wxUserAlias: {
            type: DataTypes.STRING,
            allowNull: true
        },
        wxNickName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        msgCount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        firstMessageAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        lastMessageAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "ChatGroupUser",
        tableName: "chat_group_user"
    })

    await ChatGroupAliasMap.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        groupUserId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        groupAlias: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "ChatGroupAliasMap",
        tableName: "chat_group_alias_map"
    })

    await ChatGroupHistory.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        groupUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        content: {
            type: DataTypes.TEXT("long"),
            allowNull: true
        },
        sentTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "ChatGroupHistory",
        tableName: "chat_group_history"
    })

    await SMSCodeRecord.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userAcctId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateValue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "SMSCodeRecord",
        tableName: "sms_code_record"
    })


    await RawWXContact.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        groupKey: {
            type: DataTypes.STRING,
            allowNull: true
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Alias: {
            type: DataTypes.STRING,
            allowNull: true
        },
        EncryptUserName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DelFlag: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Type: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        VerifyFlag: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Reserved1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Reserved2: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Reserved3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Reserved4: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Remark: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NickName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        LabelIDList: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DomainList: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ChatRoomType: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        PYInitial: {
            type: DataTypes.STRING,
            allowNull: true
        },
        QuanPin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        RemarkPYInitial: {
            type: DataTypes.STRING,
            allowNull: true
        },
        RemarkQuanPin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        BigHeadImgUrl: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "RawWXContact",
        tableName: "raw_wx_contact"
    })
    await RawFTSChatroom.init({
        docid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        groupKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        c0groupRemark: {
            type: DataTypes.STRING,
            allowNull: false
        },
        c1nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        c2alias: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        paranoid: true,
        modelName: "RawFTSChatroom",
        tableName: "raw_fts_chatroom"
    })
    await RawGroupHistory.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        groupKey: {
            type: DataTypes.STRING,
            allowNull: true
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        localId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        talkerId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        subType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isSender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        strContent: {
            // long text type
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        strTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nickName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: false,
        modelName: "RawGroupHistory",
        tableName: "raw_group_history"
    })

}