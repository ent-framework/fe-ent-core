<template>
  <ent-page-wrapper title="图片预览示例">
    <ent-image-preview :image-list="imgList" />
    <ent-button type="primary" @click="openImg">无预览图</ent-button>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { createImgPreview } from 'fe-ent-core';

  const imgList: string[] = [
    'https://picsum.photos/id/66/346/216',
    'https://picsum.photos/id/67/346/216',
    'https://picsum.photos/id/68/346/216',
  ];
  export default defineComponent({
    setup() {
      function openImg() {
        const onImgLoad = ({ index, url, dom }) => {
          console.log(`第${index + 1}张图片已加载，URL为：${url}`, dom);
        };
        // 可以使用createImgPreview返回的 PreviewActions 来控制预览逻辑，实现类似幻灯片、自动旋转之类的骚操作
        createImgPreview({ imageList: imgList, defaultWidth: 700, rememberState: true, onImgLoad });
      }
      return { imgList, openImg };
    },
  });
</script>
