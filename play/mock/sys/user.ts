import { getRequestToken, resultError, resultSuccess } from '../_util';
import type { MockMethod } from 'vite-plugin-mock';
import type { requestParams } from '../_util';

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      displayName: 'Ent Admin',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      displayName: 'test user',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
      desc: 'tester',
      token: 'fakeToken2',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
    {
      userId: '3',
      username: 'supper',
      password: '123456',
      displayName: 'develop user',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
      desc: 'super star',
      token: 'fakeToken3',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
};

const session: any = {
  inst: {
    id: 10000,
    name: 'Ent Framework',
    fullName: 'Ent Framework单点登录认证系统',
    division: '',
    country: '',
    region: '',
    locality: '',
    street: '',
    contact: '',
    address: '',
    postalCode: '',
    phone: '',
    fax: '',
    email: '',
    sortIndex: 1,
    logo: './assets/logo.png',
    domain: '127.0.0.1',
    frontTitle: '统一认证系统',
    consoleDomain: 'mgt.maxkey.top',
    consoleTitle: '身份安全管理系统',
    captcha: 'TEXT',
    defaultUri: '',
    status: 1,
    description: '',
  },
  state: '1asfss09afjspudfdd',
};

export default [
  //获取用户session
  {
    url: '/api/session',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      return resultSuccess({ ...session });
    },
  },
  // mock user login
  {
    url: '/api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password,
      );
      if (!checkUser) {
        return resultError('Incorrect account or password！');
      }
      const { userId, username: _username, token, displayName, desc, roles } = checkUser;
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        displayName,
        desc,
      });
    },
  },
  {
    url: '/api/user-info',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/api/perm-code',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      const codeList = fakeCodeList[checkUser.userId];

      return resultSuccess(codeList);
    },
  },
  {
    url: '/api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' });
    },
  },
] as MockMethod[];
