<template>
  <EntTitle :class="prefixCls" v-if="getTitle" :helpMessage="helpMessage">
    {{ getTitle }}
  </EntTitle>
</template>
<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import { EntTitle } from '@ent-core/components/basic';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { isFunction } from '@ent-core/utils/is';

  export default defineComponent({
    name: 'BasicTableTitle',
    components: { EntTitle },
    props: {
      title: {
        type: [Function, String] as PropType<string | ((data: Recordable) => string)>,
      },
      getSelectRows: {
        type: Function as PropType<() => Recordable[]>,
      },
      helpMessage: {
        type: [String, Array] as PropType<string | string[]>,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('basic-table-title');

      const getTitle = computed(() => {
        const { title, getSelectRows = () => {} } = props;
        let tit = title;

        if (isFunction(title)) {
          tit = title({
            selectRows: getSelectRows(),
          });
        }
        return tit;
      });

      return { getTitle, prefixCls };
    },
  });
</script>
