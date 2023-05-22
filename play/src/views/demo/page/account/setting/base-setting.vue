<template>
  <ent-collapse-container title="基本设置" :can-expan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <EntForm @register="register" />
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <ent-cropper-avatar
            :upload-api="uploadApi"
            :value="avatar"
            btn-text="更换头像"
            :btn-props="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            width="150"
            @change="updateAvatar"
          />
        </div>
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
  </ent-collapse-container>
</template>
<script lang="ts">
  import { computed, defineComponent, onMounted } from 'vue';
  import { Button, Col, Row } from 'ant-design-vue';
  import {
    EntCollapseContainer,
    EntCropperAvatar,
    EntForm,
    useForm,
    useMessage,
    useUserStore,
  } from 'fe-ent-core';

  import headerImg from '/@/assets/images/header.jpg';
  import { accountInfoApi } from '/@/api/account';
  import { baseSetschemas } from './data';

  export default defineComponent({
    components: {
      EntForm,
      EntCollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      EntCropperAvatar,
    },
    setup() {
      const { createMessage } = useMessage();
      const userStore = useUserStore();

      const [register, { setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const data = await accountInfoApi();
        setFieldsValue(data);
      });

      const avatar = computed(() => {
        const { avatar } = userStore.getUserInfo;
        return avatar || headerImg;
      });

      function updateAvatar(src: string) {
        const userinfo = userStore.getUserInfo;
        userinfo.avatar = src;
        userStore.setUserInfo(userinfo);
      }

      return {
        avatar,
        register,
        uploadApi: uploadApi as any,
        updateAvatar,
        handleSubmit: () => {
          createMessage.success('更新成功！');
        },
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
