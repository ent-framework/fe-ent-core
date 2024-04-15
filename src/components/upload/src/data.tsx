import { NProgress, NTag } from 'naive-ui';
import TableAction from '../../../components/table/src/components/table-action.vue';
import { useI18n } from '../../../hooks/web/use-i18n';
import ThumbUrl from './thumb-url.vue';
import { UploadResultStatus } from './typing';
import {
  // checkImgType,
  isImgTypeByName,
} from './helper';
import type { AnyFunction, Fn } from '../../../types';
import type { FileItem, PreviewFileItem } from './typing';
import type { BasicColumn, TableActionItem } from '../../../components/table/interface';

// 文件上传列表
export function createTableColumns(): BasicColumn[] {
  const { t } = useI18n();
  return [
    {
      key: 'thumbUrl',
      title: t('component.upload.legend'),
      width: 100,
      render: (record) => {
        const { thumbUrl } = (record as FileItem) || {};
        return thumbUrl && <ThumbUrl fileUrl={thumbUrl} />;
      },
    },
    {
      key: 'name',
      title: t('component.upload.fileName'),
      align: 'left',
      render: (record) => {
        const { name: text } = record;
        const { percent, status: uploadStatus } = (record as FileItem) || {};
        let status: 'default' | 'success' | 'error' | 'warning' | 'info' = 'default';
        if (uploadStatus === UploadResultStatus.ERROR) {
          status = 'error';
        } else if (uploadStatus === UploadResultStatus.UPLOADING) {
          status = 'default';
        } else if (uploadStatus === UploadResultStatus.SUCCESS) {
          status = 'success';
        }
        return (
          <span>
            <p class="truncate mb-1" title={text}>
              {text}
            </p>
            <NProgress percentage={percent} status={status} />
          </span>
        );
      },
    },
    {
      key: 'size',
      title: t('component.upload.fileSize'),
      width: 100,
      render: ({ text = 0 }) => {
        return text && `${(text / 1024).toFixed(2)}KB`;
      },
    },
    // {
    //   dataIndex: 'type',
    //   title: '文件类型',
    //   width: 100,
    // },
    {
      key: 'status',
      title: t('component.upload.fileStatue'),
      width: 100,
      render: ({ text }) => {
        if (text === UploadResultStatus.SUCCESS) {
          return <NTag type="success">{() => t('component.upload.uploadSuccess')}</NTag>;
        } else if (text === UploadResultStatus.ERROR) {
          return <NTag type="error">{() => t('component.upload.uploadError')}</NTag>;
        } else if (text === UploadResultStatus.UPLOADING) {
          return <NTag type="info">{() => t('component.upload.uploading')}</NTag>;
        }

        return text;
      },
    },
  ];
}
export function createActionColumn(handleRemove: AnyFunction): BasicColumn {
  const { t } = useI18n();
  return {
    width: 120,
    title: t('component.upload.operating'),
    key: 'action',
    render: ({ record }) => {
      const actions: TableActionItem[] = [
        {
          label: t('component.upload.del'),
          color: 'error',
          onClick: handleRemove.bind(null, record),
        },
      ];
      // if (checkImgType(record)) {
      //   actions.unshift({
      //     label: t('component.upload.preview'),
      //     onClick: handlePreview.bind(null, record),
      //   });
      // }
      return <TableAction actions={actions} outside={true} />;
    },
  };
}
// 文件预览列表
export function createPreviewColumns(): BasicColumn[] {
  const { t } = useI18n();
  return [
    {
      key: 'url',
      title: t('component.upload.legend'),
      width: 100,
      render: ({ record }) => {
        const { url } = (record as PreviewFileItem) || {};
        return isImgTypeByName(url) && <ThumbUrl fileUrl={url} />;
      },
    },
    {
      key: 'name',
      title: t('component.upload.fileName'),
      align: 'left',
    },
  ];
}

export function createPreviewActionColumn({
  handleRemove,
  handleDownload,
}: {
  handleRemove: Fn;
  handleDownload: Fn;
}): BasicColumn {
  const { t } = useI18n();
  return {
    width: 160,
    title: t('component.upload.operating'),
    key: 'action',
    render: ({ record }) => {
      const actions: TableActionItem[] = [
        {
          label: t('component.upload.del'),
          color: 'error',
          onClick: handleRemove.bind(null, record),
        },
        {
          label: t('component.upload.download'),
          onClick: handleDownload.bind(null, record),
        },
      ];

      return <TableAction actions={actions} outside={true} />;
    },
  };
}
