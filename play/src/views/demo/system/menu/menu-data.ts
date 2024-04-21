import { h } from 'vue';
import { EntIcon } from 'fe-ent-core';
import { NTag } from 'naive-ui';
import type { BasicColumn } from 'fe-ent-core/es/components/table/interface';
import type { FormSchema } from 'fe-ent-core/es/components/form/interface';
import type { DescItem } from 'fe-ent-core/es/components/description/interface';
export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    key: 'menuName',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    key: 'icon',
    width: 50,
    render: (record) => {
      return h(EntIcon, { icon: record.icon });
    },
  },
  {
    title: '权限标识',
    key: 'permission',
    width: 180,
  },
  {
    title: '组件',
    key: 'component',
  },
  {
    title: '排序',
    key: 'orderNo',
    width: 50,
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
    render: (record) => {
      const status = record.status;
      const enable = Math.trunc(status) === 0;
      const type = enable ? 'success' : 'warning';
      const text = enable ? '是' : '否';
      return h(NTag, { type }, () => text);
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 180,
  },
];

const isDir = (type: string) => type === '0';
const isMenu = (type: string) => type === '1';
const isButton = (type: string) => type === '2';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    gridItemProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    gridItemProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '目录', value: '0' },
        { label: '菜单', value: '1' },
        { label: '按钮', value: '2' },
      ],
    },
    gridItemProps: { span: 24 },
  },
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'parentMenu',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'menuName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },

  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'routePath',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
    },
  },
  {
    field: 'isExt',
    label: '是否外链',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },

  {
    field: 'show',
    label: '是否显示',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
];

export const detailSchema: DescItem[] = [
  {
    field: 'type',
    label: '菜单类型',
  },
  {
    field: 'menuName',
    label: '菜单名称',
  },
  {
    field: 'parentMenu',
    label: '上级菜单',
  },
  {
    field: 'orderNo',
    label: '排序',
  },
  {
    field: 'icon',
    label: '图标',
  },
  {
    field: 'routePath',
    label: '路由地址',
  },
  {
    field: 'component',
    label: '组件路径',
  },
  {
    field: 'permission',
    label: '权限标识',
  },
  {
    field: 'status',
    label: '状态',
  },
  {
    field: 'isExt',
    label: '是否外链',
  },
  {
    field: 'keepalive',
    label: '是否缓存',
  },
  {
    field: 'show',
    label: '是否显示',
  },
];
