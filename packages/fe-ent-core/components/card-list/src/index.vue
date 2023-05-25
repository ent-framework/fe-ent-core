<template>
  <div class="p-2">
    <div class="p-4 mb-2 bg-white">
      <EntForm @register="registerForm" />
    </div>
    <div class="p-2 bg-white">
      <List
        :grid="{ gutter: 5, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: grid }"
        :data-source="data"
        :pagination="paginationProp"
      >
        <template #header>
          <div class="flex justify-end space-x-2"
            ><slot name="header" />
            <Tooltip>
              <template #title>
                <div class="w-50">每行显示数量</div>
                <Slider
                  id="slider"
                  v-bind="sliderProp"
                  v-model:value="grid"
                  @change="sliderChange"
                />
              </template>
              <EntButton><TableOutlined /></EntButton>
            </Tooltip>
            <Tooltip @click="fetch">
              <template #title>刷新</template>
              <EntButton><RedoOutlined /></EntButton>
            </Tooltip>
          </div>
        </template>
        <template #renderItem="{ item }">
          <ListItem>
            <Card>
              <template #title />
              <template #cover>
                <div :class="height">
                  <Image :src="item.imgs[0]" />
                </div>
              </template>
              <template #actions>
                <EditOutlined key="edit" />
                <EntDropdown
                  :trigger="['hover']"
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

              <CardMeta>
                <template #title>
                  <TypographyText :content="item.name" :ellipsis="{ tooltip: item.address }" />
                </template>
                <template #avatar>
                  <Avatar :src="item.avatar" />
                </template>
                <template #description>{{ item.time }}</template>
              </CardMeta>
            </Card>
          </ListItem>
        </template>
      </List>
    </div>
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
  import { Avatar, Card, Image, List, Slider, Tooltip, Typography } from 'ant-design-vue';
  import { isFunction } from '@vueuse/shared';
  import { EntDropdown } from '@ent-core/components/dropdown';
  import { EntForm, useForm } from '@ent-core/components/form';
  import { propTypes } from '@ent-core/utils/prop-types';
  import { EntButton } from '@ent-core/components/button';
  import { grid, useSlider } from './data';
  const ListItem = List.Item;
  const CardMeta = Card.Meta;
  const TypographyText = Typography.Text;

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
      Image,
      Tooltip,
      Avatar,
      ListItem,
      CardMeta,
      TypographyText,
      Slider,
      Card,
      List,
    },
    props: {
      params: propTypes.object.def({}),
      api: propTypes.func,
    },
    emits: ['getMethod', 'delete'],
    setup(props, { emit }) {
      // 获取slider属性
      const sliderProp = computed(() => useSlider(4));
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
        baseColProps: { span: 6 },
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
      };
    },
  });
</script>
