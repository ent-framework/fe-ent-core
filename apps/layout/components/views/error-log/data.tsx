import { Tag } from 'ant-design-vue';
import { ErrorTypeEnum } from 'fe-ent-core/es/logics';
import { useI18n } from 'fe-ent-core/es/hooks';
import type { BasicColumn } from 'fe-ent-core/es/components/table/interface';

export function getColumns(): BasicColumn[] {
  const { t } = useI18n();
  return [
    {
      dataIndex: 'type',
      title: t('sys.errorLog.tableColumnType'),
      width: 80,
      customRender: ({ text }) => {
        const color =
          text === ErrorTypeEnum.VUE
            ? 'green'
            : text === ErrorTypeEnum.RESOURCE
              ? 'cyan'
              : text === ErrorTypeEnum.PROMISE
                ? 'blue'
                : ErrorTypeEnum.AJAX
                  ? 'red'
                  : 'purple';
        return <Tag color={color}>{() => text}</Tag>;
      },
    },
    {
      dataIndex: 'url',
      title: 'URL',
      width: 200,
    },
    {
      dataIndex: 'time',
      title: t('sys.errorLog.tableColumnDate'),
      width: 160,
    },
    {
      dataIndex: 'file',
      title: t('sys.errorLog.tableColumnFile'),
      width: 200,
    },
    {
      dataIndex: 'name',
      title: 'Name',
      width: 200,
    },
    {
      dataIndex: 'message',
      title: t('sys.errorLog.tableColumnMsg'),
      width: 300,
    },
    {
      dataIndex: 'stack',
      title: t('sys.errorLog.tableColumnStackMsg'),
    },
  ];
}

export function getDescSchema(): any {
  return getColumns().map((column) => {
    return {
      field: column.dataIndex!,
      label: column.title,
    };
  });
}
