/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;

  [key: string]: any;
}

/**
 * 会话状态
 */
export interface Session {
  isRememberMe?: boolean;
  isKerberos?: string;
  otpType?: string;
  otpInterval?: number;
  userDomainUrlJson?: string;
  inst?: Institution;
  captcha?: string;
  state?: string;
}

/**
 * 租户信息
 */
export interface Institution {
  id?: number;
  name?: string;
  fullName?: string;
  logo?: string;
  domain?: string;
  frontTitle?: string;
  consoleTitle?: string;
  defaultUri?: string;
  description?: string;
}
