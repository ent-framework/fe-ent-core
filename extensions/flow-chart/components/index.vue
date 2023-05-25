<template>
  <div class="h-full" :class="prefixCls">
    <FlowChartToolbar v-if="toolbar" :prefix-cls="prefixCls" @view-data="handlePreview" />
    <div ref="lfElRef" class="h-full" />
    <EntModal title="流程数据" width="50%" @register="register">
      <JsonPreview :data="graphData" />
    </EntModal>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, ref, unref, watch } from 'vue';
  import LogicFlow from '@logicflow/core';
  import { BpmnElement, DndPanel, Menu, SelectionSelect, Snapshot } from '@logicflow/extension';
  import { EntModal } from 'fe-ent-core';
  import { useAppStore } from 'fe-ent-core/es/store';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import { useModal } from 'fe-ent-core/es/components/modal';
  import { JsonPreview } from 'fe-ent-code-editor';
  import { createFlowChartContext } from './use-flow-context';
  import { toLogicFlowData } from './adpter-for-turbo';
  import FlowChartToolbar from './toolbar.vue';
  import { configDefaultDndPanel } from './config';
  import type { Definition } from '@logicflow/core';
  import type { PropType, Ref } from 'vue';
  export default defineComponent({
    name: 'FlowChart',
    components: { EntModal, FlowChartToolbar, JsonPreview },
    props: {
      flowOptions: {
        type: Object as PropType<Definition>,
        default: () => ({}),
      },

      data: {
        type: Object as PropType<any>,
        default: () => ({}),
      },

      toolbar: {
        type: Boolean,
        default: true,
      },
      patternItems: {
        type: Array,
      },
    },
    setup(props) {
      const lfElRef = ref(null);
      const graphData = ref({});

      const lfInstance = ref(null) as Ref<LogicFlow | null>;

      const { prefixCls } = useDesign('flow-chart');
      const appStore = useAppStore();
      const [register, { openModal }] = useModal();
      createFlowChartContext({
        logicFlow: lfInstance as unknown as LogicFlow,
      });

      const getFlowOptions = computed(() => {
        const { flowOptions } = props;

        const defaultOptions: Partial<Definition> = {
          grid: true,
          background: {
            color: appStore.getDarkMode === 'light' ? '#f7f9ff' : '#151515',
          },
          keyboard: {
            enabled: true,
          },
          ...flowOptions,
        };
        return defaultOptions as Definition;
      });

      watch(
        () => props.data,
        () => {
          onRender();
        },
      );

      // TODO
      // watch(
      //   () => appStore.getDarkMode,
      //   () => {
      //     init();
      //   }
      // );

      watch(
        () => unref(getFlowOptions),
        (options) => {
          unref(lfInstance)?.updateEditConfig(options);
        },
      );

      // init logicFlow
      async function init() {
        await nextTick();

        const lfEl = unref(lfElRef);
        if (!lfEl) {
          return;
        }
        LogicFlow.use(DndPanel);

        // Canvas configuration
        LogicFlow.use(Snapshot);
        // Use the bpmn plug-in to introduce bpmn elements, which can be used after conversion in turbo
        LogicFlow.use(BpmnElement);
        // Start the right-click menu
        LogicFlow.use(Menu);
        LogicFlow.use(SelectionSelect);

        lfInstance.value = new LogicFlow({
          ...unref(getFlowOptions),
          container: lfEl,
        });
        const lf = unref(lfInstance)!;
        lf?.setDefaultEdgeType('line');
        onRender();
        lf?.setPatternItems(props.patternItems || configDefaultDndPanel(lf));
      }

      async function onRender() {
        await nextTick();
        const lf = unref(lfInstance);
        if (!lf) {
          return;
        }
        const lFData = toLogicFlowData(props.data);
        lf.render(lFData);
      }

      function handlePreview() {
        const lf = unref(lfInstance);
        if (!lf) {
          return;
        }
        graphData.value = unref(lf).getGraphData();
        openModal();
      }

      onMounted(init);

      return {
        register,
        prefixCls,
        lfElRef,
        handlePreview,
        graphData,
      };
    },
  });
</script>
