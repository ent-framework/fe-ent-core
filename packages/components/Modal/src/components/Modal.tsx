import { Modal } from 'ant-design-vue';
import { defineComponent, toRefs, unref, Plugin } from 'vue';
import { basicProps } from '../props';
import { useModalDragMove } from '../hooks/use-modal-drag';
import { useAttrs } from '@ent-core/hooks/core/use-attrs';
import { extendSlots } from '@ent-core/utils/helper/tsx-helper';

const EntModal = defineComponent({
  name: 'EntModal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel'],
  setup(props, { slots }) {
    const { visible, draggable, destroyOnClose } = toRefs(props);
    const attrs = useAttrs();
    useModalDragMove({
      visible,
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
