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
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { EntCollapseContainer } from 'fe-ent-core/lib/components/container';
  import { EntCropperAvatar } from 'fe-ent-core/lib/components/cropper';

  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';

  import headerImg from 'fe-ent-core/lib/assets/images/header.jpg';
  import { accountInfoApi } from '/@/api/account';
  import { baseSetschemas } from './data';
  import { useUserStore } from 'fe-ent-core/lib/store/modules/user';
  import { uploadApi } from 'fe-ent-core/lib/logics/api/sys/upload';

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
