<template>
  <EditTableHeaderCell v-if="getIsEdit">
    {{ getTitle }}
  </EditTableHeaderCell>
  <span v-else>{{ getTitle }}</span>
  <BasicHelp v-if="getHelpMessage" :text="getHelpMessage" :class="`${prefixCls}__help`" />
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import type { BasicColumn } from '../types/table';
  import { defineComponent, computed } from 'vue';
  import BasicHelp from '@ent-core/components/basic/src/basic-help.vue';
  import EditTableHeaderCell from './edit-table-header-icon.vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';

  export default defineComponent({
    name: 'TableHeaderCell',
    components: {
      EditTableHeaderCell,
      BasicHelp,
    },
    props: {
      column: {
        type: Object as PropType<BasicColumn>,
        default: () => ({}),
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('basic-table-header-cell');

      const getIsEdit = computed(() => !!props.column?.edit);
      const getTitle = computed(() => props.column?.customTitle);
      const getHelpMessage = computed(() => props.column?.helpMessage);

      return { prefixCls, getIsEdit, getTitle, getHelpMessage };
    },
  });
</script>
