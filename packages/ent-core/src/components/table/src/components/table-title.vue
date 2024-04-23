<template>
  <EntTitle v-if="getTitle" :class="prefixCls" :help-message="helpMessage">
    {{ getTitle }}
  </EntTitle>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { EntTitle } from '../../../../components/basic';
  import { useDesign } from '../../../../hooks/web/use-design';
  import type { PropType } from 'vue';
  import type { Recordable } from '../../../../types';

  export default defineComponent({
    name: 'BasicTableTitle',
    components: { EntTitle },
    props: {
      title: {
        type: [Function, String] as PropType<string | ((data) => string)>
      },
      getSelectRows: {
        type: Function as PropType<() => Recordable[]>
      },
      helpMessage: {
        type: [String, Array] as PropType<string | string[]>
      }
    },
    setup(props) {
      const { prefixCls } = useDesign('basic-table-title');

      const getTitle = computed(() => {
        const { title, getSelectRows = () => {} } = props;
        let tit = title;

        if (title && typeof title === 'function') {
          tit = title({
            selectRows: getSelectRows()
          });
        }
        return tit;
      });

      return { getTitle, prefixCls };
    }
  });
</script>
