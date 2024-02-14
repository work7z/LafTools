import {
    Sequelize, DataTypes, Model, InferCreationAttributes, InferAttributes, CreationOptional
} from 'sequelize';
import { DaoRef } from './index'
import { isDevEnv } from '../hooks/env';

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
    declare id: number;
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

// chat group, chat group members, chat group history

// model for chat group
export class ChatGroup extends Model<InferAttributes<ChatGroup>, InferCreationAttributes<ChatGroup>> {
    declare id: number;
    declare name: string;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

// model for chat group members 
export class ChatGroupMember extends Model<InferAttributes<ChatGroupMember>, InferCreationAttributes<ChatGroupMember>> {
    declare id: number;
    declare groupId: number;
    declare userId: number;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}

// model for chat group history
export class ChatGroupHistory extends Model<InferAttributes<ChatGroupHistory>, InferCreationAttributes<ChatGroupHistory>> {
    declare id: number;
    declare groupId: number;
    declare userId: number;
    declare type: string; // text, emoji, image, file, etc...
    declare content: string;
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}



export default async (daoRef: DaoRef) => {
    let sequelize = daoRef.db
    // options
    sequelize.sync({ alter: true })
    // init model
    InvitationCode.init({
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
    User.init({
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
    UserToken.init({
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
    UserLoginLog.init({
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
    Block.init({
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
    Topic.init({
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
    TopicContent.init({
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
    TopicComment.init({
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
    Audit.init({
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

    SMSCodeRecord.init({
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

    // setup dev env
    if (isDevEnv()) {
        let a = await InvitationCode.create({
            code: "test100",
            useCount: 0,
            maxUseCount: 500,
            expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // expired after 30 days
        },)
        console.log('test invitation code', a.toJSON())
    }
}