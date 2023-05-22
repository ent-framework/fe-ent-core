<template>
  <EntPageWrapper title="消息示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Message">
      <ent-button class="mr-2" @click="infoMsg('Info message')"> Info </ent-button>
      <ent-button class="mr-2" color="success" @click="successMsg('Success message')">
        Success
      </ent-button>
      <ent-button class="mr-2" color="warning" @click="warningMsg('Warning message')">
        Warning
      </ent-button>
      <ent-button class="mr-2" color="error" @click="errorMsg('Error message')"> Error </ent-button>
      <ent-button class="mr-2" type="primary" @click="handleLoading"> Loading </ent-button>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Comfirm">
      <ent-button class="mr-2" @click="handleConfirm('info')"> Info </ent-button>
      <ent-button color="warning" class="mr-2" @click="handleConfirm('warning')">
        Warning
      </ent-button>
      <ent-button color="success" class="mr-2" @click="handleConfirm('success')">
        Success
      </ent-button>
      <ent-button color="error" class="mr-2" @click="handleConfirm('error')"> Error </ent-button>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Modal">
      <ent-button class="mr-2" @click="handleInfoModal"> Info </ent-button>
      <ent-button color="success" class="mr-2" @click="handleSuccessModal"> Success </ent-button>
      <ent-button color="error" class="mr-2" @click="handleErrorModal"> Error </ent-button>
      <ent-button color="warning" class="mr-2" @click="handleWarningModal"> Warning </ent-button>
      <ent-button color="warning" class="mr-2" @click="handleAjax"> test ajax error </ent-button>
    </CollapseContainer>

    <CollapseContainer
      class="w-full h-32 mt-5 bg-white rounded-md"
      title="Notification 用法与上面一致"
    >
      <ent-button color="success" class="mr-2" @click="handleNotify"> Success </ent-button>
    </CollapseContainer>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntCollapseContainer, EntPageWrapper, defHttp, useMessage } from 'fe-ent-core';

  export default defineComponent({
    components: { CollapseContainer: EntCollapseContainer, EntPageWrapper },
    setup() {
      const {
        createMessage,
        createConfirm,
        createSuccessModal,
        createInfoModal,
        createErrorModal,
        createWarningModal,
        notification,
      } = useMessage();
      const { info, success, warning, error } = createMessage;

      function handleLoading() {
        createMessage.loading('Loading...');
      }
      function handleConfirm(type: 'warning' | 'error' | 'success' | 'info') {
        createConfirm({
          iconType: type,
          title: 'Tip',
          content: 'content message...',
        });
      }
      function handleSuccessModal() {
        createSuccessModal({ title: 'Tip', content: 'content message...' });
      }
      function handleErrorModal() {
        createErrorModal({ title: 'Tip', content: 'content message...' });
      }
      function handleWarningModal() {
        createWarningModal({ title: 'Tip', content: 'content message...' });
      }
      function handleInfoModal() {
        createInfoModal({ title: 'Tip', content: 'content message...' });
      }
      function handleAjax() {
        defHttp.post({
          url: '/hr-organization/add',
          data: {
            orgName: 'd',
            orgCode: 'a',
            orgSort: 1,
            statusFlag: 1,
            orgRemark: 'a',
            orgId: -1,
          },
        });
      }
      function handleNotify() {
        notification.success({
          message: 'Tip',
          description: 'content message...',
        });
      }
      return {
        infoMsg: info,
        successMsg: success,
        warningMsg: warning,
        errorMsg: error,
        handleLoading,
        handleConfirm,
        handleSuccessModal,
        handleErrorModal,
        handleWarningModal,
        handleInfoModal,
        handleNotify,
        handleAjax,
      };
    },
  });
</script>
