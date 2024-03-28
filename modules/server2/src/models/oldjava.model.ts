import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// example: TestFn

export interface TestFn {
  id?: number;
  name: string;
}

export class TestFnModel extends Model<TestFn> implements TestFn {
  public id: number;
  public name: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function TestFnModelGenerator(sequelize: Sequelize): typeof TestFnModel {
  TestFnModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: 'testfn',
      sequelize,
    },
  );

  return TestFnModel;
}

/**
 * do the same for :
 * CREATE TABLE `app_release_blogs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(150) DEFAULT NULL,
  `CONTENT` text DEFAULT NULL,
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp(),
  `HTMLCONTENT` text DEFAULT NULL,
  `DISABLED` int(11) DEFAULT 0,
  `BLOG_CODE` varchar(100) DEFAULT NULL,
  `CONTENT_ZH_CN` text DEFAULT NULL,
  `CONTENT_ZH_HK` text DEFAULT NULL,
  `HTMLCONTENT_ZH_CN` text DEFAULT NULL,
  `HTMLCONTENT_ZH_HK` text DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `BLOG_CODE` (`BLOG_CODE`)
 */

export interface AppReleaseBlog {
  id?: number;
  title: string;
  content: string;
  createTime: Date;
  htmlContent: string;
  disabled: number;
  blogCode: string;
  contentZhCn: string;
  contentZhHk: string;
  htmlContentZhCn: string;
  htmlContentZhHk: string;
}

export class AppReleaseBlogModel extends Model<AppReleaseBlog> implements AppReleaseBlog {
  public id: number;
  public title: string;
  public content: string;
  public createTime: Date;
  public htmlContent: string;
  public disabled: number;
  public blogCode: string;
  public contentZhCn: string;
  public contentZhHk: string;
  public htmlContentZhCn: string;
  public htmlContentZhHk: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function AppReleaseBlogModelGenerator(sequelize: Sequelize): typeof AppReleaseBlogModel {
  AppReleaseBlogModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(150),
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      createTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      htmlContent: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      disabled: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      blogCode: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      contentZhCn: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      contentZhHk: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      htmlContentZhCn: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      htmlContentZhHk: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'app_release_blogs',
      sequelize,
    },
  );

  return AppReleaseBlogModel;
}

/**
 do the same for 
CREATE TABLE `app_release_version` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TYPE` varchar(20) DEFAULT NULL,
  `VERSION` varchar(100) DEFAULT NULL,
  `DESCRIPTION` text DEFAULT NULL,
  `BLOG_ID` int(11) DEFAULT 0,
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp(),
  `DISABLED` int(11) DEFAULT 0,
  `BLOG_CODE` varchar(100) DEFAULT NULL,
  `DESCRIPTION_ZH_CN` text DEFAULT NULL,
  `DESCRIPTION_ZH_HK` text DEFAULT NULL,
  PRIMARY KEY (`ID`)

 */
export interface AppReleaseVersion {
  id?: number;
  type: string;
  version: string;
  description: string;
  blogId: number;
  createTime: Date;
  disabled: number;
  blogCode: string;
  descriptionZhCn: string;
  descriptionZhHk: string;
}

export class AppReleaseVersionModel extends Model<AppReleaseVersion> implements AppReleaseVersion {
  public id: number;
  public type: string;
  public version: string;
  public description: string;
  public blogId: number;
  public createTime: Date;
  public disabled: number;
  public blogCode: string;
  public descriptionZhCn: string;
  public descriptionZhHk: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function AppReleaseVersionModelGenerator(sequelize: Sequelize): typeof AppReleaseVersionModel {
  AppReleaseVersionModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      version: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      blogId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      disabled: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      blogCode: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      descriptionZhCn: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      descriptionZhHk: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'app_release_version',
      sequelize,
    },
  );

  return AppReleaseVersionModel;
}

/**
 do the same for 
 CREATE TABLE `g_log_verify_page_hist` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `VERSION` varchar(50) DEFAULT NULL,
  `PLATFORM` varchar(50) DEFAULT NULL,
  `DEVICE_ID` varchar(80) DEFAULT NULL,
  `ROUTE_PATH` varchar(200) DEFAULT NULL,
  `USER_ID` int(11) DEFAULT NULL,
  `FORWARD_IP` varchar(50) DEFAULT NULL,
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp(),
  `USER_LANG` varchar(100) DEFAULT NULL,
  `USER_AREA` varchar(100) DEFAULT NULL,
  `APP_LANG` varchar(80) DEFAULT NULL,
  `CALL_OR_NOT_MODE` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`ID`)

  */
export interface GLogVerifyPageHist {
  id?: number;
  version: string;
  platform: string;
  deviceId: string;
  routePath: string;
  userId: number;
  forwardIp: string;
  createTime: Date;
  userLang: string;
  userArea: string;
  appLang: string;
  callOrNotMode: string;
}

export class GLogVerifyPageHistModel extends Model<GLogVerifyPageHist> implements GLogVerifyPageHist {
  public id: number;
  public version: string;
  public platform: string;
  public deviceId: string;
  public routePath: string;
  public userId: number;
  public forwardIp: string;
  public createTime: Date;
  public userLang: string;
  public userArea: string;
  public appLang: string;
  public callOrNotMode: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function GLogVerifyPageHistModelGenerator(sequelize: Sequelize): typeof GLogVerifyPageHistModel {
  GLogVerifyPageHistModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      version: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      platform: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      deviceId: {
        allowNull: false,
        type: DataTypes.STRING(80),
      },
      routePath: {
        allowNull: false,
        type: DataTypes.STRING(200),
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      forwardIp: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      createTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      userLang: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      userArea: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      appLang: {
        allowNull: false,
        type: DataTypes.STRING(80),
      },
      callOrNotMode: {
        allowNull: false,
        type: DataTypes.STRING(80),
      },
    },
    {
      tableName: 'g_log_verify_page_hist',
      sequelize,
    },
  );

  return GLogVerifyPageHistModel;
}

/**
 * do the same for 
 * CREATE TABLE `g_log_verify_version_hist` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) DEFAULT NULL,
  `VERSION` varchar(50) DEFAULT NULL,
  `PLATFORM` varchar(50) DEFAULT NULL,
  `DEVICE_ID` varchar(80) DEFAULT NULL,
  `FORWARD_IP` varchar(50) DEFAULT NULL,
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp(),
  `USER_LANG` varchar(100) DEFAULT NULL,
  `USER_AREA` varchar(100) DEFAULT NULL,
  `APP_LANG` varchar(80) DEFAULT NULL,
  `CALL_OR_NOT_MODE` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`ID`)

 */

export interface GLogVerifyVersionHist {
  id?: number;
  userId: number;
  version: string;
  platform: string;
  deviceId: string;
  forwardIp: string;
  createTime: Date;
  userLang: string;
  userArea: string;
  appLang: string;
  callOrNotMode: string;
}

/**
 * do the same for CREATE TABLE `g_system_config` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `KEYNAME` varchar(100) DEFAULT NULL,
  `KEYVALUE` longtext DEFAULT NULL,
  `DISABLED` int(11) DEFAULT 0,
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ID`)

 */
export interface GSystemConfig {
  id?: number;
  keyName: string;
  keyValue: string;
  disabled: number;
  createTime: Date;
}

export class GSystemConfigModel extends Model<GSystemConfig> implements GSystemConfig {
  public id: number;
  public keyName: string;
  public keyValue: string;
  public disabled: number;
  public createTime: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function GSystemConfigModelGenerator(sequelize: Sequelize): typeof GSystemConfigModel {
  GSystemConfigModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      keyName: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      keyValue: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      disabled: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'g_system_config',
      sequelize,
    },
  );

  return GSystemConfigModel;
}

/**
 do the same for 
 CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(30) NOT NULL,
  `USER_PASSWORD` varchar(50) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `EMAIL_VALID_CODE` varchar(32) DEFAULT NULL,
  `SENT_VALID_CODE_TIME` timestamp NULL DEFAULT NULL,
  `IS_EMAIL_VALID` int(11) DEFAULT 0,
  `IS_ADMIN` int(11) DEFAULT 0,
  `IS_BAN` int(11) DEFAULT 0,
  `IS_DONATED` int(11) DEFAULT 0,
  `DONATED_AMOUNT` decimal(10,0) DEFAULT 0,
  `LOGIN_TIMES` int(11) DEFAULT 0,
  `TOKEN` varchar(32) DEFAULT NULL,
  `LAST_ACTIVE_TIME` timestamp NULL DEFAULT NULL,
  `FROM_IP_ADDRESS` varchar(50) DEFAULT NULL,
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp(),
  `NEW_USER_PASSWORD` varchar(50) DEFAULT NULL,
  `CLOUD_SAVE_ID` varchar(32) DEFAULT NULL,
  `USER_PW_MD5` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USER_NAME` (`USER_NAME`)

 */
export interface User {
  id?: number;
  userName: string;
  userPassword: string;
  email: string;
  emailValidCode: string;
  sentValidCodeTime: Date;
  isEmailValid: number;
  isAdmin: number;
  isBan: number;
  isDonated: number;
  donatedAmount: number;
  loginTimes: number;
  token: string;
  lastActiveTime: Date;
  fromIpAddress: string;
  createTime: Date;
  newUserPassword: string;
  cloudSaveId: string;
  userPwMd5: string;
}

export class UserModel extends Model<User> implements User {
  public id: number;
  public userName: string;
  public userPassword: string;
  public email: string;
  public emailValidCode: string;
  public sentValidCodeTime: Date;
  public isEmailValid: number;
  public isAdmin: number;
  public isBan: number;
  public isDonated: number;
  public donatedAmount: number;
  public loginTimes: number;
  public token: string;
  public lastActiveTime: Date;
  public fromIpAddress: string;
  public createTime: Date;
  public newUserPassword: string;
  public cloudSaveId: string;
  public userPwMd5: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function UserModelGenerator(sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      userPassword: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      emailValidCode: {
        allowNull: false,
        type: DataTypes.STRING(32),
      },
      sentValidCodeTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      isEmailValid: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isAdmin: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isBan: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      isDonated: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      donatedAmount: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 0),
      },
      loginTimes: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      token: {
        allowNull: false,
        type: DataTypes.STRING(32),
      },
      lastActiveTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      fromIpAddress: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      createTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      newUserPassword: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      cloudSaveId: {
        allowNull: false,
        type: DataTypes.STRING(32),
      },
      userPwMd5: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: 'user',
      sequelize,
    },
  );

  return UserModel;
}

/**
 * do same for 
CREATE TABLE `user_order_list` (
  `ID` varchar(32) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `ORDER_TYPE` varchar(15) DEFAULT NULL COMMENT 'WX/PAYPAL',
  `MONEY_CNY` decimal(19,4) DEFAULT NULL,
  `MONEY_USD` decimal(19,4) DEFAULT NULL,
  `IS_PAID` int(11) DEFAULT 0,
  `PAY_DETAIL` text DEFAULT NULL,
  `PAID_TIME` timestamp NULL DEFAULT NULL,
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp(),
  `QRCODE_STR` text DEFAULT NULL,
  `MAX_DEVICES_SIZE` int(11) NOT NULL,
  `REMARK_FROM_USER` varchar(5000) DEFAULT NULL,
  `PURCHASE_YEAR` int(11) NOT NULL,
  `ENABLE_TIME_TYPE` varchar(30) NOT NULL,
  `IS_ADMIN_READ` int(11) DEFAULT 0,
  `PURCHASE_DAYS` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

 */
export interface UserOrderList {
  id: string;
  userId: number;
  orderType: string;
  moneyCny: number;
  moneyUsd: number;
  isPaid: number;
  payDetail: string;
  paidTime: Date;
  createTime: Date;
  qrcodeStr: string;
  maxDevicesSize: number;
  remarkFromUser: string;
  purchaseYear: number;
  enableTimeType: string;
  isAdminRead: number;
  purchaseDays: number;
}

export class UserOrderListModel extends Model<UserOrderList> implements UserOrderList {
  public id: string;
  public userId: number;
  public orderType: string;
  public moneyCny: number;
  public moneyUsd: number;
  public isPaid: number;
  public payDetail: string;
  public paidTime: Date;
  public createTime: Date;
  public qrcodeStr: string;
  public maxDevicesSize: number;
  public remarkFromUser: string;
  public purchaseYear: number;
  public enableTimeType: string;
  public isAdminRead: number;
  public purchaseDays: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function UserOrderListModelGenerator(sequelize: Sequelize): typeof UserOrderListModel {
  UserOrderListModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING(32),
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      orderType: {
        allowNull: false,
        type: DataTypes.STRING(15),
      },
      moneyCny: {
        allowNull: false,
        type: DataTypes.DECIMAL(19, 4),
      },
      moneyUsd: {
        allowNull: false,
        type: DataTypes.DECIMAL(19, 4),
      },
      isPaid: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      payDetail: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      paidTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      qrcodeStr: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      maxDevicesSize: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      remarkFromUser: {
        allowNull: false,
        type: DataTypes.STRING(5000),
      },
      purchaseYear: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      enableTimeType: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      isAdminRead: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      purchaseDays: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'user_order_list',
      sequelize,
    },
  );

  return UserOrderListModel;
}

/**
  do same for 

CREATE TABLE `user_premium_rights` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `ORDER_ID` varchar(32) DEFAULT NULL,
  `START_TIME` timestamp NULL DEFAULT NULL,
  `END_TIME` datetime DEFAULT NULL,
  `STATUS` int(11) DEFAULT 1 COMMENT '1 enable, 0 disable',
  `REASON` varchar(30) DEFAULT NULL COMMENT 'SYS0912',
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp(),
  `R_TYPE` varchar(30) DEFAULT NULL COMMENT 'SYS0912',
  `INFO_ID` varchar(32) DEFAULT NULL,
  `MAX_DEVICE_IF_DEFINED` int(11) DEFAULT NULL,
  `T_END_TIME` datetime DEFAULT NULL,
  `T2_END_TIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)

 */

export interface UserPremiumRights {
  id?: number;
  userId: number;
  orderId: string;
  startTime: Date;
  endTime: Date;
  status: number;
  reason: string;
  createTime: Date;
  rType: string;
  infoId: string;
  maxDeviceIfDefined: number;
  tEndTime: Date;
  t2EndTime: Date;
}

export class UserPremiumRightsModel extends Model<UserPremiumRights> implements UserPremiumRights {
  public id: number;
  public userId: number;
  public orderId: string;
  public startTime: Date;
  public endTime: Date;
  public status: number;
  public reason: string;
  public createTime: Date;
  public rType: string;
  public infoId: string;
  public maxDeviceIfDefined: number;
  public tEndTime: Date;
  public t2EndTime: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function UserPremiumRightsModelGenerator(sequelize: Sequelize): typeof UserPremiumRightsModel {
  UserPremiumRightsModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: DataTypes.STRING(32),
      },
      startTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      endTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      status: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      reason: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      createTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      rType: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      infoId: {
        allowNull: false,
        type: DataTypes.STRING(32),
      },
      maxDeviceIfDefined: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      tEndTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      t2EndTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'user_premium_rights',
      sequelize,
    },
  );

  return UserPremiumRightsModel;
}

/**
 do same for 
 CREATE TABLE `user_secure_id` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `SECURE_KEY` varchar(120) NOT NULL,
  `DISABLE` int(11) DEFAULT 0,
  `CREATE_TIME` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4873 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

 */
export interface UserSecureId {
  id?: number;
  userId: number;
  secureKey: string;
  disable: number;
  createTime: Date;
}

export class UserSecureIdModel extends Model<UserSecureId> implements UserSecureId {
  public id: number;
  public userId: number;
  public secureKey: string;
  public disable: number;
  public createTime: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function UserSecureIdModelGenerator(sequelize: Sequelize): typeof UserSecureIdModel {
  UserSecureIdModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      secureKey: {
        allowNull: false,
        type: DataTypes.STRING(120),
      },
      disable: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'user_secure_id',
      sequelize,
    },
  );

  return UserSecureIdModel;
}
