import { getAllRoleList, getDeptList, isAccountExist } from '/@/api/system';
import type { BasicColumn } from 'fe-ent-core/es/components/table/interface';
import type { FormSchema } from 'fe-ent-core/es/components/form/interface';
export const columns: BasicColumn[] = [
  {
    title: '用户名',
    key: 'account',
    width: 120,
  },
  {
    title: '昵称',
    key: 'nickname',
    width: 120,
  },
  {
    title: '邮箱',
    key: 'email',
    width: 120,
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 180,
  },
  {
    title: '角色',
    key: 'role',
    width: 200,
  },
  {
    title: '备注',
    key: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            isAccountExist(value)
              .then(() => resolve())
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: '角色',
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'dept',
    label: '所属部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getDeptList,
      fieldNames: {
        label: 'deptName',
        value: 'id',
        children: 'children',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
