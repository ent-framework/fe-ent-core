<template>
  <ent-page-wrapper title="表单基础示例" content-full-height>
    <ent-collapse-container title="基础示例">
      <ent-form
        :schemas="schemas"
        :action-col-options="{ span: 24 }"
        @submit="handleSubmit"
        @reset="handleReset"
      >
        <template #selectA="{ model, field }">
          <NSelect
            v-model:value="model[field]"
            :options="optionsA"
            mode="multiple"
            allow-clear
            @update:value="valueSelectA = model[field]"
          />
        </template>
        <template #selectB="{ model, field }">
          <NSelect
            v-model:value="model[field]"
            :options="optionsB"
            mode="multiple"
            allow-clear
            @update:value="valueSelectB = model[field]"
          />
        </template>
        <template #localSearch="{ model, field }">
          <ApiSelect
            v-model:value="model[field]"
            :api="optionsListApi"
            show-search
            option-filter-prop="label"
            result-field="list"
            label-field="name"
            value-field="id"
          />
        </template>
        <template #remoteSearch="{ model, field }">
          <ApiSelect
            v-model:value="model[field]"
            :api="optionsListApi"
            filterable
            :filter-option="false"
            result-field="list"
            label-field="name"
            value-field="id"
            :params="searchParams"
            @search="onSearch"
          />
        </template>
      </ent-form>
    </ent-collapse-container>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { ApiSelect } from 'fe-ent-core';
  import { useMessage } from 'fe-ent-core/es/hooks';

  import { optionsListApi } from '/@/api/select';
  import { useDebounceFn } from '@vueuse/core';
  import { treeOptionsListApi } from '/@/api/tree';
  import { NSelect } from 'naive-ui';
  import { cloneDeep } from 'lodash';
  import type { FormSchema } from 'fe-ent-core/es/components/form/interface';
  import type { Recordable } from 'fe-ent-core/es/types';

  const valueSelectA = ref<string[]>([]);
  const valueSelectB = ref<string[]>([]);
  const options = ref<Recordable[]>([]);
  for (let i = 1; i < 10; i++) options.value.push({ label: `选项${i}`, value: `${i}` });

  const optionsA = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectB).includes(op.value);
      return op;
    });
  });
  const optionsB = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectA).includes(op.value);
      return op;
    });
  });

  const provincesOptions = [
    {
      id: 'guangdong',
      label: '广东省',
      value: '1',
      key: '1',
    },
    {
      id: 'jiangsu',
      label: '江苏省',
      value: '2',
      key: '2',
    },
  ];
  const citiesOptionsData = {
    guangdong: [
      {
        label: '珠海市',
        value: '1',
        key: '1',
      },
      {
        label: '深圳市',
        value: '2',
        key: '2',
      },
      {
        label: '广州市',
        value: '3',
        key: '3',
      },
    ],
    jiangsu: [
      {
        label: '南京市',
        value: '1',
        key: '1',
      },
      {
        label: '无锡市',
        value: '2',
        key: '2',
      },
      {
        label: '苏州市',
        value: '3',
        key: '3',
      },
    ],
  };

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '基础字段',
      gridItemProps: {
        span: 24,
      },
    },
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      gridItemProps: {
        span: 8,
      },
      componentProps: ({ schema, formModel }) => {
        console.log('form:', schema);
        console.log('formModel:', formModel);
        return {
          placeholder: '自定义placeholder',
          onChange: (e: any) => {
            console.log(e);
          },
        };
      },
      renderComponentContent: () => {
        return {
          prefix: () => 'pSlot',
          suffix: () => 'sSlot',
        };
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '带后缀',
      defaultValue: '111',
      gridItemProps: {
        span: 8,
      },
      componentProps: {
        onChange: (e: any) => {
          console.log(e);
        },
      },
      suffix: '天',
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '字段3',
      gridItemProps: {
        span: 8,
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      gridItemProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
            key: '1',
          },
          {
            label: '选项2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: '字段5',
      gridItemProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: '字段7',
      gridItemProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field8',
      component: 'Checkbox',
      label: '字段8',
      gridItemProps: {
        span: 8,
      },
      renderComponentContent: 'Check',
    },
    {
      field: 'field9',
      component: 'Switch',
      label: '字段9',
      gridItemProps: {
        span: 8,
      },
    },
    {
      field: 'field10',
      component: 'RadioButtonGroup',
      label: '字段10',
      gridItemProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field11',
      component: 'Cascader',
      label: '字段11',
      gridItemProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      field: 'divider-api-select',
      component: 'Divider',
      label: '远程下拉演示',
      gridItemProps: {
        span: 24,
      },
    },
    {
      field: 'field30',
      component: 'ApiSelect',
      label: '懒加载远程下拉',
      required: true,
      componentProps: {
        // more details see /src/components/Form/src/components/ApiSelect.vue
        api: optionsListApi,
        params: {
          id: 1,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        // not request untill to select
        immediate: false,
        onChange: (e) => {
          console.log('selected:', e);
        },
        // atfer request callback
        onOptionsChange: (options) => {
          console.log('get options', options.length, options);
        },
      },
      gridItemProps: {
        span: 8,
      },
      defaultValue: '0',
    },
    {
      field: 'field31',
      component: 'Input',
      label: '下拉本地搜索',
      helpMessage: ['ApiSelect组件', '远程数据源本地搜索', '只发起一次请求获取所有选项'],
      required: true,
      slot: 'localSearch',
      gridItemProps: {
        span: 8,
      },
      defaultValue: '0',
    },
    {
      field: 'field32',
      component: 'Input',
      label: '下拉远程搜索',
      helpMessage: ['ApiSelect组件', '将关键词发送到接口进行远程搜索'],
      required: true,
      slot: 'remoteSearch',
      gridItemProps: {
        span: 8,
      },
      defaultValue: '0',
    },
    {
      field: 'field33',
      component: 'ApiTreeSelect',
      label: '远程下拉树',
      helpMessage: ['ApiTreeSelect组件', '使用接口提供的数据生成选项'],
      required: true,
      componentProps: {
        api: treeOptionsListApi,
        bordered: true,
        resultField: 'list',
        keyField: 'value',
        labelField: 'title',
      },
      gridItemProps: {
        span: 8,
      },
    },
    {
      field: 'field34',
      component: 'ApiRadioGroup',
      label: '远程Radio',
      helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
      required: true,
      componentProps: {
        api: optionsListApi,
        params: {
          count: 2,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
      },
      defaultValue: '1',
      gridItemProps: {
        span: 8,
      },
    },
    {
      field: 'field35',
      component: 'ApiRadioGroup',
      label: '远程Radio',
      helpMessage: ['ApiRadioGroup组件', '使用接口提供的数据生成选项'],
      required: true,
      componentProps: {
        api: optionsListApi,
        params: {
          count: 2,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        isBtn: true,
      },
      gridItemProps: {
        span: 8,
      },
    },
    {
      field: 'divider-linked',
      component: 'Divider',
      label: '字段联动',
      gridItemProps: {
        span: 24,
      },
    },
    {
      field: 'province',
      component: 'Select',
      label: '省份',
      gridItemProps: {
        span: 8,
      },
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: provincesOptions,
          placeholder: '省份与城市联动',
          onChange: (e: any) => {
            // console.log(e)
            let citiesOptions =
              e == 1
                ? citiesOptionsData[provincesOptions[0].id]
                : citiesOptionsData[provincesOptions[1].id];
            // console.log(citiesOptions)
            if (e === undefined) {
              citiesOptions = [];
            }
            formModel.city = undefined; //  reset city value
            const { updateSchema } = formActionType;
            updateSchema({
              field: 'city',
              componentProps: {
                options: citiesOptions,
              },
            });
          },
        };
      },
    },
    {
      field: 'city',
      component: 'Select',
      label: '城市',
      gridItemProps: {
        span: 8,
      },
      componentProps: {
        options: [], // defalut []
        placeholder: '省份与城市联动',
      },
    },
    {
      field: 'divider-selects',
      component: 'Divider',
      label: '互斥多选',
      helpMessage: ['两个Select共用数据源', '但不可选择对方已选中的项目'],
      gridItemProps: {
        span: 24,
      },
    },
    {
      field: 'selectA',
      component: 'Select',
      label: '互斥SelectA',
      slot: 'selectA',
      defaultValue: [],
      gridItemProps: {
        span: 8,
      },
    },
    {
      field: 'selectB',
      component: 'Select',
      label: '互斥SelectB',
      slot: 'selectB',
      defaultValue: [],
      gridItemProps: {
        span: 8,
      },
    },
    {
      field: 'divider-others',
      component: 'Divider',
      label: '其它',
      gridItemProps: {
        span: 24,
      },
    },
    {
      field: 'field20',
      component: 'InputNumber',
      label: '字段20',
      required: true,
      gridItemProps: {
        span: 8,
      },
    },
    // {
    //   field: 'field21',
    //   component: 'Slider',
    //   label: '字段21',
    //   componentProps: {
    //     min: 0,
    //     max: 100,
    //     range: true,
    //     marks: {
    //       20: '20°C',
    //       60: '60°C',
    //     },
    //   },
    //   gridItemProps: {
    //     span: 8,
    //   },
    // },
    {
      field: 'field22',
      component: 'Rate',
      label: '字段22',
      defaultValue: 3,
      gridItemProps: {
        span: 8,
      },
      componentProps: {
        disabled: false,
        allowHalf: true,
      },
    },
  ];

  export default defineComponent({
    components: {
      ApiSelect,
      NSelect,
    },
    setup() {
      const check = ref(null);
      const { createMessage } = useMessage();
      const keyword = ref<string>('');
      const searchParams = computed<Recordable>(() => {
        return { keyword: unref(keyword) };
      });

      function onSearch(value: string) {
        keyword.value = value;
      }
      return {
        schemas,
        optionsListApi,
        optionsA,
        optionsB,
        valueSelectA,
        valueSelectB,
        onSearch: useDebounceFn(onSearch, 300),
        searchParams,
        handleReset: () => {
          keyword.value = '';
        },
        handleSubmit: (values: any) => {
          createMessage.success(`click search,values:${JSON.stringify(values)}`);
        },
        check,
      };
    },
  });
</script>
