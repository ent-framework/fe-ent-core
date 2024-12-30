import type { FormProps, FormSchema } from 'fe-ent-core/es/components/form/interface';
import type { BasicColumn } from 'fe-ent-core/es/components/table/interface';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      key: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '姓名',
      key: 'name',
      width: 150,
    },
    {
      title: 'ObjectName',
      key: 'obj.name',
      width: 100,
    },
    {
      title: '地址',
      key: 'address',
    },
    {
      title: '编号',
      key: 'no',
      width: 150,
      sorter: true,
      defaultHidden: true,
    },
    {
      title: '开始时间',
      width: 150,
      sorter: true,
      key: 'beginTime',
    },
    {
      title: '结束时间',
      width: 150,
      sorter: true,
      key: 'endTime',
    },
  ];
}

export function getBasicShortColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      width: 150,
      key: 'id',
      sorter: true,
      sortOrder: 'ascend',
    },
    {
      title: '姓名',
      key: 'name',
      width: 120,
    },
    {
      title: '地址',
      key: 'address',
    },
    {
      title: '编号',
      key: 'no',
      width: 80,
    },
  ];
}

export function getMultipleHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      key: 'id',
      width: 200,
    },
    {
      title: '姓名',
      key: 'name',
      width: 120,
    },
    {
      title: '地址',
      key: 'address',
      sorter: true,
      children: [
        {
          title: '编号',
          key: 'no',
          width: 120,
          filters: [
            { text: 'Male', value: 'male', children: [] },
            { text: 'Female', value: 'female', children: [] },
          ],
        },
        {
          title: '开始时间',
          key: 'beginTime',
          width: 120,
        },
        {
          title: '结束时间',
          key: 'endTime',
          width: 120,
        },
      ],
    },
  ];
}

export function getCustomHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      key: 'id',
      helpMessage: 'headerHelpMessage方式1',
      width: 200,
    },
    {
      // title: '姓名',
      key: 'name',
      width: 120,
      // slots: { title: 'customTitle' },
    },
    {
      // title: '地址',
      key: 'address',
      width: 120,
      // slots: { title: 'customAddress' },
      sorter: true,
    },

    {
      title: '编号',
      key: 'no',
      width: 120,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
    },
    {
      title: '开始时间',
      key: 'beginTime',
      width: 120,
    },
    {
      title: '结束时间',
      key: 'endTime',
      width: 120,
    },
  ];
}

const cellContent = (_, index) => ({
  colSpan: index === 9 ? 0 : 1,
});

export function getMergeHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      key: 'id',
      width: 300,
      render: (_, index) => ({
        colSpan: index === 9 ? 6 : 1,
      }),
    },
    {
      title: '姓名',
      key: 'name',
      width: 300,
      render: cellContent,
    },
    {
      title: '地址',
      key: 'address',
      width: 120,
      sorter: true,
      render: (_, index) => ({
        rowSpan: index === 2 ? 2 : 1,
        colSpan: index === 3 || index === 9 ? 0 : 1,
      }),
    },
    {
      title: '编号',
      key: 'no',
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
      customCell: cellContent,
    },
    {
      title: '开始时间',
      key: 'beginTime',
      width: 200,
      render: cellContent,
    },
    {
      title: '结束时间',
      key: 'endTime',
      width: 200,
      render: cellContent,
    },
  ];
}
export const getAdvanceSchema = (itemNumber = 6): FormSchema[] => {
  const arr: any = [];
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    });
  }
  return arr;
};
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      ...getAdvanceSchema(5),
      {
        field: `field11`,
        label: `Slot示例`,
        component: 'Select',
        slot: 'custom',
        gridItemProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
export function getBasicData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        obj: { name: `test-${index + 10}` },
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
      });
    }
    return arr;
  })();
}

export function getTreeTableData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
        children: [
          {
            id: `l2-${index}`,
            name: `John Brown - ${index}`,
            age: `1${index}`,
            no: `${index + 10}`,
            address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
            beginTime: new Date().toLocaleString(),
            endTime: new Date().toLocaleString(),
          },
        ],
      });
    }
    return arr;
  })();
}
