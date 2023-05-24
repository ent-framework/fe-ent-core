<template>
  <div :class="prefixCls">
    <PreviewGroup>
      <slot v-if="!imageList || $slots.default" />
      <template v-else>
        <template v-for="item in getImageList" :key="item.src">
          <Image v-bind="item">
            <template v-if="item.placeholder" #placeholder>
              <Image v-bind="item" :src="item.placeholder" :preview="false" />
            </template>
          </Image>
        </template>
      </template>
    </PreviewGroup>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import { Image } from 'ant-design-vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { propTypes } from '@ent-core/utils/prop-types';
  import { isString } from '@ent-core/utils/is';
  import type { PropType } from 'vue';
  import type { ImageItem } from './typing';

  export default defineComponent({
    name: 'EntImagePreview',
    components: {
      Image,
      PreviewGroup: Image.PreviewGroup,
    },
    props: {
      functional: propTypes.bool,
      imageList: {
        type: Array as PropType<ImageItem[]>,
      },
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
              placeholder: false,
            };
          }
          return item;
        });
      });

      return {
        prefixCls,
        getImageList,
      };
    },
  });
</script>
