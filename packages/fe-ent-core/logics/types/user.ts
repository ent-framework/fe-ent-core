/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  authType?: string;
  state?: string;
  captcha?: string;
  mobile?: any;
  otpCaptcha?: any;
  rememberMe?: boolean;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  type: string;
  ticket: string;
  userId: string | number;
  token: string;
  rememberMe?: string;
  rememberMeExpiresIn?: number;
  refresh_token: string;
  expired: number;
}

/**
 * @description: Get user information return value
 */
export interface UserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 显示名字
  displayName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
  email: string;
  // 租户ID
  instId: string;
  instName?: any;
  // 密码设置类型
  passwordSetType?: number;
  // 个人首页
  homePath?: string;
  // 权限
  authorities: string[];
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
  auth?: LoginResultModel;
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
