
  import { computed, defineComponent } from 'vue';
  import { NImage, NImageGroup } from 'naive-ui';
  import { useDesign } from '../../../hooks';
  import { isString } from '../../../utils/is';
  import type { PropType } from 'vue';
  import type { ImageItem } from './typing';

  export default defineComponent({
    name: 'EntImagePreview',
    components: {
      NImage,
      NImageGroup
    },
    props: {
      functional: {
        type: Boolean,
        default: false
      },
      imageList: {
        type: Array as PropType<ImageItem[]>
      }
    },
    setup(props) {
      const { prefixCls } = useDesign('image-preview');

      const getImageList = computed((): any[] => {
        const { imageList } = props;
        if (!imageList) {
          return [];
        }
        return imageList.map((item) => {
          if (isString(item)) {
            return {
              src: item,
              placeholder: false
            };
          }
          return item;
        });
      });

      return {
        prefixCls,
        getImageList
      };
    }
  });
