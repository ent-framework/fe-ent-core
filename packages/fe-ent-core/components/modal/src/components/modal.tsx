import { defineComponent, toRefs, unref } from 'vue';
import { Modal } from 'ant-design-vue';
import { useAttrs } from '@ent-core/hooks/core/use-attrs';
import { extendSlots } from '@ent-core/utils/helper/tsx-helper';
import { basicProps } from '../props';
import { useModalDragMove } from '../hooks/use-modal-drag';
import type { Plugin } from 'vue';
import type { Recordable } from '@ent-core/types';

const EntModal = defineComponent({
  name: 'EntModal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel'],
  setup(props, { slots }) {
    const { open, draggable, destroyOnClose } = toRefs(props);
    const attrs = useAttrs();
    useModalDragMove({
      open,
      destroyOnClose,
      draggable,
    });

    return () => {
      const propsData = { ...unref(attrs), ...props } as Recordable;
      return <Modal {...propsData}>{extendSlots(slots)}</Modal>;
    };
  },
});

export default EntModal as typeof EntModal & Plugin;
