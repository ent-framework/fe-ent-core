<template>
  <EntModal
    v-bind="$attrs"
    :title="t('component.excel.exportModalTitle')"
    @ok="handleOk"
    @register="registerModal"
  >
    <EntForm
      :label-width="100"
      :schemas="schemas"
      :show-action-button-group="false"
      @register="registerForm"
    />
  </EntModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntModal, useModalInner } from 'fe-ent-core/es/components/modal';
  import { EntForm, useForm } from 'fe-ent-core/es/components/form';
  import { useI18n } from 'fe-ent-core/es/hooks/web/use-i18n';
  import type { FormSchema } from 'fe-ent-core/es/components/form/interface';

  function getSchema() {
    const { t } = useI18n();
    const schemas: FormSchema[] = [
      {
        field: 'filename',
        component: 'Input',
        label: t('component.excel.fileName'),
        rules: [{ required: true }],
        gridItemProps: {
          span: 24,
        },
      },
      {
        field: 'bookType',
        component: 'Select',
        label: t('component.excel.fileType'),
        defaultValue: 'xlsx',
        rules: [{ required: true }],
        gridItemProps: {
          span: 24,
        },
        componentProps: {
          options: [
            {
              label: 'xlsx',
              value: 'xlsx',
              key: 'xlsx',
            },
            {
              label: 'html',
              value: 'html',
              key: 'html',
            },
            {
              label: 'csv',
              value: 'csv',
              key: 'csv',
            },
            {
              label: 'txt',
              value: 'txt',
              key: 'txt',
            },
          ],
        },
      },
    ];
    return schemas;
  }

  export default defineComponent({
    name: 'EntExportExcelModal',
    components: { EntModal, EntForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const [registerForm, { validate, getFieldsValue }] = useForm();
      const [registerModal, { closeModal }] = useModalInner();
      const { t } = useI18n();
      const schemas = getSchema();

      async function handleOk() {
        const { warnings } = await validate();
        if (warnings && warnings?.length > 0) {
          return;
        }
        const { filename, bookType } = getFieldsValue();
        emit('success', {
          filename: `${filename.split('.').shift()}.${bookType}`,
          bookType,
        });
        closeModal();
      }

      return {
        schemas,
        handleOk,
        registerForm,
        registerModal,
        t,
      };
    },
  });
</script>
