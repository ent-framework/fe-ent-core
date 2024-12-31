<template>
  <ent-page-wrapper title="Ref操作示例">
    <div class="mb-4">
      <ent-button class="mr-2" @click="setProps({ labelWidth: 150 })"> 更改labelWidth </ent-button>
      <ent-button class="mr-2" @click="setProps({ labelWidth: 120 })"> 还原labelWidth </ent-button>
      <ent-button class="mr-2" @click="setProps({ size: 'large' })"> 更改Size </ent-button>
      <ent-button class="mr-2" @click="setProps({ size: 'small' })"> 还原Size </ent-button>
      <ent-button class="mr-2" @click="setProps({ disabled: true })"> 禁用表单 </ent-button>
      <ent-button class="mr-2" @click="setProps({ disabled: false })"> 解除禁用 </ent-button>
      <ent-button class="mr-2" @click="setProps({ compact: true })"> 紧凑表单 </ent-button>
      <ent-button class="mr-2" @click="setProps({ compact: false })"> 还原正常间距 </ent-button>
      <ent-button class="mr-2" @click="setProps({ actionColOptions: { span: 8 } })">
        操作按钮位置
      </ent-button>
    </div>
    <div class="mb-4">
      <ent-button class="mr-2" @click="setProps({ showActionButtonGroup: false })">
        隐藏操作按钮
      </ent-button>
      <ent-button class="mr-2" @click="setProps({ showActionButtonGroup: true })">
        显示操作按钮
      </ent-button>
      <ent-button class="mr-2" @click="setProps({ showResetButton: false })">
        隐藏重置按钮
      </ent-button>
      <ent-button class="mr-2" @click="setProps({ showResetButton: true })">
        显示重置按钮
      </ent-button>
      <ent-button class="mr-2" @click="setProps({ showSubmitButton: false })">
        隐藏查询按钮
      </ent-button>
      <ent-button class="mr-2" @click="setProps({ showSubmitButton: true })">
        显示查询按钮
      </ent-button>
      <ent-button
        class="mr-2"
        @click="
          setProps({
            resetButtonOptions: {
              disabled: true,
              btnContent: '重置New'
            }
          })
        "
      >
        修改重置按钮
      </ent-button>
      <ent-button
        class="mr-2"
        @click="
          setProps({
            submitButtonOptions: {
              disabled: true,
              loading: true
            }
          })
        "
      >
        修改查询按钮
      </ent-button>
    </div>
    <ent-collapse-container title="使用ref调用表单内部函数示例">
      <ent-form
        ref="formElRef"
        :schemas="schemas"
        :label-width="100"
        :action-col-options="{ span: 24 }"
        @submit="handleSubmit"
      />
    </ent-collapse-container>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useMessage } from 'fe-ent-core/es/hooks';
  import type {
    FormActionType,
    FormProps,
    FormSchema
  } from 'fe-ent-core/es/components/form/interface';
  import type { Nullable } from 'fe-ent-core/es/types';

  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      gridItemProps: {
        span: 8
      },
      componentProps: {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e);
        }
      }
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      gridItemProps: {
        span: 8
      }
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '字段3',
      gridItemProps: {
        span: 8
      }
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      gridItemProps: {
        span: 8
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
            key: '1'
          },
          {
            label: '选项2',
            value: '2',
            key: '2'
          }
        ]
      }
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: '字段5',
      gridItemProps: {
        span: 8
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1'
          },
          {
            label: '选项2',
            value: '2'
          }
        ]
      }
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: '字段7',
      gridItemProps: {
        span: 8
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1'
          },
          {
            label: '选项2',
            value: '2'
          }
        ]
      }
    }
  ];

  export default defineComponent({
    setup() {
      const formElRef = ref<Nullable<FormActionType>>(null);
      const { createMessage } = useMessage();
      return {
        formElRef,
        schemas,
        handleSubmit: (values: any) => {
          createMessage.success(`click search,values:${JSON.stringify(values)}`);
        },
        setProps(props: FormProps) {
          const formEl = formElRef.value;
          if (!formEl) return;
          formEl.setProps(props);
        }
      };
    }
  });
</script>
