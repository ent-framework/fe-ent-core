<template>
  <ent-collapse-container title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <EntForm @register="register" />
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <ent-cropper-avatar
            :uploadApi="uploadApi"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </a-col>
    </a-row>
    <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
  </ent-collapse-container>
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent, onMounted } from 'vue';
  import { EntForm, useForm } from '@ent-core/components/form';
  import { EntCollapseContainer } from '@ent-core/components/container';
  import { EntCropperAvatar } from '@ent-core/components/cropper';

  import { useMessage } from '@ent-core/hooks/web/use-message';

  import headerImg from '/@/assets/images/header.jpg';
  import { accountInfoApi } from '/@/api/account';
  import { baseSetschemas } from './data';
  import { useUserStore } from '@ent-core/store/modules/user';
  import { uploadApi } from '@ent-core/logics/api/upload';

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
