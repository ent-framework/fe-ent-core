<template>
  <ent-collapse-container title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register" />
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
  import { BasicForm, useForm } from 'fe-ent-core/components/Form/index';
  import { EntCollapseContainer } from 'fe-ent-core/components/Container';
  import { EntCropperAvatar } from 'fe-ent-core/components/Cropper';

  import { useMessage } from 'fe-ent-core/hooks/web/useMessage';

  import headerImg from 'fe-ent-core/assets/images/header.jpg';
  import { accountInfoApi } from 'fe-ent-core/api/demo/account';
  import { baseSetschemas } from './data';
  import { useUserStore } from 'fe-ent-core/store/modules/user';
  import { uploadApi } from 'fe-ent-core/api/sys/upload';

  export default defineComponent({
    components: {
      BasicForm,
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
