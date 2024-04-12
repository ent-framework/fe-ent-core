import type { TreeItem } from 'fe-ent-core/es/components/tree/interface';

export const treeData: TreeItem[] = [
  {
    label: 'parent ',
    key: '0-0',
    icon: 'ion:settings-outline',
    children: [
      { label: 'leaf', key: '0-0-0' },
      {
        label: 'leaf',
        key: '0-0-1',
        children: [
          { label: 'leaf', key: '0-0-0-0', children: [{ label: 'leaf', key: '0-0-0-0-1' }] },
          { label: 'leaf', key: '0-0-0-1', disabled: true },
        ],
      },
    ],
  },
  {
    label: 'parent 2',
    key: '1-1',
    children: [
      { label: 'leaf', key: '1-1-0' },
      { label: 'leaf', key: '1-1-1' },
    ],
  },
  {
    label: 'parent 3',
    key: '2-2',
    children: [
      { label: 'leaf', key: '2-2-0' },
      { label: 'leaf', key: '2-2-1' },
    ],
  },
];
