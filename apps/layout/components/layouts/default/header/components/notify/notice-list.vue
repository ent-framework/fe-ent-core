<template>
  <a-list :class="prefixCls" bordered :pagination="getPagination">
    <template v-for="item in getData" :key="item.id">
      <a-list-item class="list-item">
        <a-list-item-meta>
          <template #title>
            <div class="title">
              <a-typography-paragraph
                style="width: 100%; margin-bottom: 0 !important"
                :style="{ cursor: isTitleClickable ? 'pointer' : '' }"
                :delete="!!item.titleDelete"
                :ellipsis="
                  $props.titleRows && $props.titleRows > 0
                    ? { rows: $props.titleRows, tooltip: !!item.title }
                    : false
                "
                :content="item.title"
                @click="handleTitleClick(item)"
              />
              <div v-if="item.extra" class="extra">
                <a-tag class="tag" :color="item.color">
                  {{ item.extra }}
                </a-tag>
              </div>
            </div>
          </template>

          <template #avatar>
            <a-avatar v-if="item.avatar" class="avatar" :src="item.avatar" />
            <span v-else> {{ item.avatar }}</span>
          </template>

          <template #description>
            <div>
              <div v-if="item.description" class="description">
                <a-typography-paragraph
                  style="width: 100%; margin-bottom: 0 !important"
                  :ellipsis="
                    $props.descRows && $props.descRows > 0
                      ? { rows: $props.descRows, tooltip: !!item.description }
                      : false
                  "
                  :content="item.description"
                />
              </div>
              <div class="datetime">
                {{ item.datetime }}
              </div>
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, watch } from 'vue';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import { isNumber } from 'fe-ent-core/es/utils';
  import { Avatar, List, Tag, Typography } from 'ant-design-vue';
  import type { ListItem } from './data';
  import type { PropType } from 'vue';
  export default defineComponent({
    components: {
      [Avatar.name]: Avatar,
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
      ATypographyParagraph: Typography.Paragraph,
      [Tag.name]: Tag,
    },
    props: {
      list: {
        type: Array as PropType<ListItem[]>,
        default: () => [],
      },
      pageSize: {
        type: [Boolean, Number] as PropType<boolean | number>,
        default: 5,
      },
      currentPage: {
        type: Number,
        default: 1,
      },
      titleRows: {
        type: Number,
        default: 1,
      },
      descRows: {
        type: Number,
        default: 2,
      },
      onTitleClick: {
        type: Function as PropType<(Recordable) => void>,
      },
    },
    emits: ['update:currentPage'],
    setup(props, { emit }) {
      const { prefixCls } = useDesign('header-notify-list');
      const current = ref(props.currentPage || 1);
      const getData = computed(() => {
        const { pageSize, list } = props;
        if (pageSize === false) return [];
        const size = isNumber(pageSize) ? pageSize : 5;
        return list.slice(size * (unref(current) - 1), size * unref(current));
      });
      watch(
        () => props.currentPage,
        (v) => {
          current.value = v;
        },
      );
      const isTitleClickable = computed(() => !!props.onTitleClick);
      const getPagination = computed(() => {
        const { list, pageSize } = props;
        if (pageSize > 0 && list && list.length > pageSize) {
          return {
            total: list.length,
            pageSize,
            //size: 'small',
            current: unref(current),
            onChange(page) {
              current.value = page;
              emit('update:currentPage', page);
            },
          };
        } else {
          return false;
        }
      });

      function handleTitleClick(item: ListItem) {
        props.onTitleClick && props.onTitleClick(item);
      }

      return { prefixCls, getPagination, getData, handleTitleClick, isTitleClickable };
    },
  });
</script>
