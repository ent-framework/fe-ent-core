import { h } from 'vue';
import { NTag } from 'naive-ui';
import { ErrorTypeEnum } from 'fe-ent-core/es/logics';
import { useI18n } from 'fe-ent-core/es/hooks';
import type { BasicColumn } from 'fe-ent-core/es/components/table/interface';
import type { DescItem } from 'fe-ent-core/es/components/description/interface';

export function getColumns(): BasicColumn[] {
  const { t } = useI18n();
  return [
    {
      key: 'type',
      title: t('sys.errorLog.tableColumnType'),
      width: 80,
      render: (record) => {
        const text = record.type;
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
        return h(NTag, { color: { color } }, () => text);
      },
    },
    {
      key: 'url',
      title: 'URL',
      width: 200,
    },
    {
      key: 'time',
      title: t('sys.errorLog.tableColumnDate'),
      width: 160,
    },
    {
      key: 'file',
      title: t('sys.errorLog.tableColumnFile'),
      width: 200,
    },
    {
      key: 'name',
      title: 'Name',
      width: 200,
    },
    {
      key: 'message',
      title: t('sys.errorLog.tableColumnMsg'),
      width: 300,
    },
    {
      key: 'stack',
      title: t('sys.errorLog.tableColumnStackMsg'),
    },
  ];
}

export function getDescSchema(): DescItem[] {
  return getColumns().map((column) => {
    return {
      field: column.key!,
      label: column.title,
    } as DescItem;
  });
}
