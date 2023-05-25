<template>
  <div :class="[prefixCls, { fullscreen }]">
    <Upload
      name="file"
      multiple
      :action="uploadUrl"
      :show-upload-list="false"
      accept=".jpg,.jpeg,.gif,.png,.webp"
      @change="handleChange"
    >
      <ent-button type="primary" v-bind="{ ...getButtonProps }">
        {{ t('component.upload.imgUpload') }}
      </ent-button>
    </Upload>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Upload } from 'ant-design-vue';
  import { useDesign, useGlobSetting, useI18n } from 'fe-ent-core/es/hooks';
  import type { Recordable } from 'fe-ent-core/es/types';
  export default defineComponent({
    name: 'TinymceImageUpload',
    components: { Upload },
    props: {
      fullscreen: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['uploading', 'done', 'error'],
    setup(props, { emit }) {
      let uploading = false;

      const { uploadUrl } = useGlobSetting();
      const { t } = useI18n();
      const { prefixCls } = useDesign('tinymce-img-upload');

      const getButtonProps = computed(() => {
        const { disabled } = props;
        return {
          disabled,
        };
      });

      function handleChange(info: Recordable) {
        const file = info.file;
        const status = file?.status;
        const url = file?.response?.url;
        const name = file?.name;

        if (status === 'uploading') {
          if (!uploading) {
            emit('uploading', name);
            uploading = true;
          }
        } else if (status === 'done') {
          emit('done', name, url);
          uploading = false;
        } else if (status === 'error') {
          emit('error');
          uploading = false;
        }
      }

      return {
        prefixCls,
        handleChange,
        uploadUrl,
        t,
        getButtonProps,
      };
    },
  });
</script>
