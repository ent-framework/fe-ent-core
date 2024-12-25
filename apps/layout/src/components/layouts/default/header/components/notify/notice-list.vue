<template>
  <NList :class="prefixCls" bordered :pagination="getPagination">
    <NListItem v-for="item in getData" :key="item.id" class="list-item">
      <template #prefix>
        <NAvatar v-if="item.avatar" class="avatar" :src="item.avatar" />
        <span v-else> {{ item.avatar }}</span>
      </template>
      <NThing>
        <div class="title">
          <NText>{{ item.title }} </NText>
          <div v-if="item.extra" class="extra">
            <NTag class="tag" :color="{ color: item.color }">
              {{ item.extra }}
            </NTag>
          </div>
        </div>
      </NThing>
    </NListItem>
  </NList>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, watch } from 'vue';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import { isNumber } from 'fe-ent-core/es/utils';
  import { NAvatar, NList, NListItem, NTag, NText, NThing } from 'naive-ui';
  import type { ListItem } from './data';
  import type { PropType } from 'vue';
  export default defineComponent({
    components: {
      NAvatar,
      NList,
      NTag,
      NText,
      NListItem,
      NThing
    },
    props: {
      list: {
        type: Array as PropType<ListItem[]>,
        default: () => []
      },
      pageSize: {
        type: Number,
        default: 5
      },
      currentPage: {
        type: Number,
        default: 1
      },
      titleRows: {
        type: Number,
        default: 1
      },
      descRows: {
        type: Number,
        default: 2
      },
      onTitleClick: {
        type: Function as PropType<(Recordable) => void>
      }
    },
    emits: ['update:currentPage'],
    setup(props, { emit }) {
      const { prefixCls } = useDesign('header-notify-list');
      const current = ref(props.currentPage || 1);
      const getData = computed(() => {
        const { pageSize, list } = props;
        const size = isNumber(pageSize) ? pageSize : 5;
        return list.slice(size * (unref(current) - 1), size * unref(current));
      });
      watch(
        () => props.currentPage,
        (v) => {
          current.value = v;
        }
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
            onChange(page: number) {
              current.value = page;
              emit('update:currentPage', page);
            }
          };
        } else {
          return false;
        }
      });

      function handleTitleClick(item: ListItem) {
        props.onTitleClick && props.onTitleClick(item);
      }

      return { prefixCls, getPagination, getData, handleTitleClick, isTitleClickable };
    }
  });
</script>
