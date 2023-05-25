<template>
  <ent-page-wrapper title="图片裁剪示例" content="需要开启测试接口服务才能进行上传测试！">
    <ent-collapse-container title="头像裁剪">
      <ent-cropper-avatar :value="avatar" />
    </ent-collapse-container>

    <ent-collapse-container title="矩形裁剪" class="my-4">
      <div class="container p-4">
        <div class="cropper-container mr-10">
          <ent-cropper-image
            ref="refCropper"
            :src="img"
            style="width: 40vw"
            @cropend="handleCropend"
          />
        </div>
        <img v-if="cropperImg" :src="cropperImg" class="croppered" alt="" />
      </div>
      <p v-if="cropperImg">裁剪后图片信息：{{ info }}</p>
    </ent-collapse-container>

    <ent-collapse-container title="圆形裁剪">
      <div class="container p-4">
        <div class="cropper-container mr-10">
          <ent-cropper-image
            ref="refCropper"
            :src="img"
            style="width: 40vw"
            circled
            @cropend="handleCircleCropend"
          />
        </div>
        <img v-if="circleImg" :src="circleImg" class="croppered" />
      </div>
      <p v-if="circleImg">裁剪后图片信息：{{ circleInfo }}</p>
    </ent-collapse-container>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useUserStore } from 'fe-ent-core/es/store';
  import img from '/@/assets/images/header.jpg';

  export default defineComponent({
    setup() {
      const info = ref('');
      const cropperImg = ref('');
      const circleInfo = ref('');
      const circleImg = ref('');
      const userStore = useUserStore();
      const avatar = ref(userStore.getUserInfo?.avatar || '');
      function handleCropend({ imgBase64, imgInfo }) {
        info.value = imgInfo;
        cropperImg.value = imgBase64;
      }

      function handleCircleCropend({ imgBase64, imgInfo }) {
        circleInfo.value = imgInfo;
        circleImg.value = imgBase64;
      }

      return {
        img,
        info,
        circleInfo,
        cropperImg,
        circleImg,
        handleCropend,
        handleCircleCropend,
        avatar,
      };
    },
  });
</script>

<style scoped>
  .container {
    display: flex;
    width: 100vw;
    align-items: center;
  }

  .cropper-container {
    width: 40vw;
  }

  .croppered {
    height: 360px;
  }

  p {
    margin: 10px;
  }
</style>
