<template>
  <div class="p-2">
    <div class="p-4 mb-2 bg-white">
      <EntForm @register="registerForm" />
    </div>
    <NCard title="sss" :bordered="false">
      <template #header>
        <div class="flex justify-end space-x-2">
          <slot name="header" />
          <NTooltip>
            <template #trigger>
              <EntButton><TableOutlined /></EntButton>
            </template>
            <div class="w-50">每行显示数量</div>
            <NSlider
              id="slider"
              v-model:value="grid"
              :marks="sliderMarks"
              :max="12"
              :min="3"
              step="mark"
              @change="sliderChange"
            />
          </NTooltip>
          <NTooltip>
            <template #trigger
              ><EntButton @click="fetch"><RedoOutlined /></EntButton
            ></template>
            刷新
          </NTooltip>
        </div>
      </template>
      <NGrid :cols="grid" :x-gap="10">
        <NGridItem v-for="(item, index) in data" :key="index">
          <NCard>
            <template #cover>
              <div :class="height">
                <NImage :src="item.imgs[0]" />
              </div>
            </template>
            <template #action>
              <EditOutlined key="edit" />
              <EntDropdown
                trigger="hover"
                :drop-menu-list="[
                  {
                    text: '删除',
                    event: '1',
                    popConfirm: {
                      title: '是否确认删除',
                      confirm: handleDelete.bind(null, item.id),
                    },
                  },
                ]"
                popconfirm
              >
                <EllipsisOutlined key="ellipsis" />
              </EntDropdown>
            </template>
            <NAvatar :src="item.avatar" />
            {{ item.time }}
          </NCard>
        </NGridItem>
      </NGrid>
    </NCard>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue';
  import {
    EditOutlined,
    EllipsisOutlined,
    RedoOutlined,
    TableOutlined,
  } from '@ant-design/icons-vue';
  import { NAvatar, NCard, NGrid, NGridItem, NImage, NSlider, NTooltip } from 'naive-ui';
  import { isFunction } from '@ent-core/utils/is';
  import { EntDropdown } from '@ent-core/components/dropdown';
  import { EntForm, useForm } from '@ent-core/components/form';
  import { propTypes } from '@ent-core/utils/prop-types';
  import { EntButton } from '@ent-core/components/button';
  import { grid, useSlider } from './data';

  //暴露内部方法
  export default defineComponent({
    name: 'EntCardList',
    components: {
      EditOutlined,
      EllipsisOutlined,
      RedoOutlined,
      TableOutlined,
      EntForm,
      EntDropdown,
      EntButton,
      NImage,
      NCard,
      NAvatar,
      NGrid,
      NGridItem,
      NTooltip,
      NSlider,
    },
    props: {
      params: propTypes.object.def({}),
      api: propTypes.func,
    },
    emits: ['getMethod', 'delete'],
    setup(props, { emit }) {
      // 获取slider属性
      const sliderProp = computed(() => useSlider(4));
      const sliderMarks = {
        3: '3',
        4: '4',
        6: '6',
        8: '8',
        12: '12',
      };
      //数据
      const data = ref([]);
      // 切换每行个数
      // cover图片自适应高度
      //修改pageSize并重新请求数据

      const height = computed(() => {
        return `h-${120 - grid.value * 6}`;
      });
      //表单
      const [registerForm, { validate }] = useForm({
        schemas: [{ field: 'type', component: 'Input', label: '类型' }],
        labelWidth: 80,
        baseGridItemProps: { span: 6 },
        actionColOptions: { span: 24 },
        autoSubmitOnEnter: true,
        submitFunc: handleSubmit,
      });
      //表单提交
      async function handleSubmit() {
        const data = await validate();
        await fetch(data);
      }
      function sliderChange(n) {
        pageSize.value = n * 4;
        fetch();
      }

      // 自动请求并暴露内部方法
      onMounted(() => {
        fetch();
        emit('getMethod', fetch);
      });

      async function fetch(p = {}) {
        const { api, params } = props;
        if (api && isFunction(api)) {
          const res = await api({ ...params, page: page.value, pageSize: pageSize.value, ...p });
          data.value = res.items;
          total.value = res.total;
        }
      }
      //分页相关
      const page = ref(1);
      const pageSize = ref(36);
      const total = ref(0);
      const paginationProp = ref({
        showSizeChanger: false,
        showQuickJumper: true,
        pageSize,
        current: page,
        total,
        showTotal: (total) => `总 ${total} 条`,
        onChange: pageChange,
        onShowSizeChange: pageSizeChange,
      });

      function pageChange(p, pz) {
        page.value = p;
        pageSize.value = pz;
        fetch();
      }
      function pageSizeChange(_current, size) {
        pageSize.value = size;
        fetch();
      }

      async function handleDelete(id) {
        emit('delete', id);
      }

      return {
        registerForm,
        sliderProp,
        data,
        paginationProp,
        sliderChange,
        handleDelete,
        height,
        grid,
        fetch,
        sliderMarks,
      };
    },
  });
</script>
