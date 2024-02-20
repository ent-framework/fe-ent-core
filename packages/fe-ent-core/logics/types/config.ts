export interface GlobConfig {
  // Site title
  title: string;
  apiUrl: string;
  uploadUrl?: string;
  logoUrl?: string;
  userApiPrefix?: string;
  apiGlobalPrefix?: string;
  webSocketPrefix?: string;
  requestTimeout?: number;
  shortName: string;
  layoutName: string;
  loginUrl: string;
  homePath: string;
  errorPath: string;
  errorLogPath: string;
}
export interface GlobEnvConfig {
  /**
   * 站点标题
   */
  VITE_GLOB_APP_TITLE: string;
  /**
   * 站点的短名称，注意，这个VITE_GLOB_APP_SHORT_NAME会被用来作为Session中的Key的前缀
   */
  VITE_GLOB_APP_SHORT_NAME: string;
  /**
   * Logo文件地址
   */
  VITE_GLOB_LOGO_URL: string;
  /**
   * 后台API服务的地址，一般都用Nginx转发，不需要设置
   */
  VITE_GLOB_API_URL: string;
  /**
   * 后端服务的API 前缀，一般需要设置，比如/api, nginx把/api 开头的请求转发到网关
   */
  VITE_GLOB_API_URL_PREFIX?: string;
  /**
   * 后端服务的websocket 前缀，一般需要设置，比如/ws, nginx把/ws 开头的请求转发到网关
   */
  VITE_GLOB_WEBSOCKET_URL_PREFIX?: string;
  /**
   * 用户服务的API前缀，一般为用户中心的访问路径，如果设置了VITE_GLOB_API_URL_PREFIX为/api
   * 则VITE_GLOB_API_USER_PREFIX前面会自动加上/api
   */
  VITE_GLOB_API_USER_PREFIX?: string;
  /**
   * 全局的API 请求超时设置单位（毫秒），默认10秒
   */
  VITE_GLOB_API_REQUEST_TIMEOUT?: number;
  /**
   * 文件上传的地址, 这个地址是一个绝对地址，用户处理文件上传请求
   */
  VITE_GLOB_UPLOAD_URL?: string;
  /**
   * Layout名称, 默认为DefaultLayout，DefaultLayout是通过fe-ent-layout注入到vue的component实例中的
   *
   */
  VITE_GLOB_LAYOUT_NAME?: string;
  /**
   * 版本信息
   */
  VITE_GLOB_VERSION?: string;
  /**
   * 登录地址，可以设置为login.html.某个具体的登录页面，主要适用于登录单独剥离的请求
   * 也可以设置为路由，比如/login
   */
  VITE_GLOB_LOGIN_URL?: string;
  /**
   * 登录成功后默认返回的路由，这个路由需要存在，否则页面会404, 默认为/dashboard
   */
  VITE_GLOB_HOME_PATH?: string;
  /**
   * 异常页，由fe-ent-layout 提供，一般不需要设置，默认/exception
   */
  VITE_GLOB_ERROR_PATH?: string;
  /**
   * 错误展示页，由fe-ent-layout 提供，一般不需要设置，默认/error-log/list
   */
  VITE_GLOB_ERROR_LOG_PATH?: string;
}
