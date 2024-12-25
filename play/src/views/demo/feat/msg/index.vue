<template>
  <ent-page-wrapper title="消息示例">
    <ent-collapse-container class="w-full h-32 rounded-md" title="Message">
      <ent-button class="mr-2" @click="infoMsg('Info message')"> Info </ent-button>
      <ent-button class="mr-2" type="success" @click="successMsg('Success message')">
        Success
      </ent-button>
      <ent-button class="mr-2" type="warning" @click="warningMsg('Warning message')">
        Warning
      </ent-button>
      <ent-button class="mr-2" type="error" @click="errorMsg('Error message')"> Error </ent-button>
      <ent-button class="mr-2" type="primary" @click="handleLoading"> Loading </ent-button>
    </ent-collapse-container>

    <ent-collapse-container class="w-full h-32 mt-5 rounded-md" title="Comfirm">
      <ent-button class="mr-2" @click="handleConfirm('info')"> Info </ent-button>
      <ent-button type="warning" class="mr-2" @click="handleConfirm('warning')">
        Warning
      </ent-button>
      <ent-button type="success" class="mr-2" @click="handleConfirm('success')">
        Success
      </ent-button>
      <ent-button type="error" class="mr-2" @click="handleConfirm('error')"> Error </ent-button>
    </ent-collapse-container>

    <ent-collapse-container class="w-full h-32 mt-5 rounded-md" title="Modal">
      <ent-button class="mr-2" @click="handleInfoModal"> Info </ent-button>
      <ent-button type="success" class="mr-2" @click="handleSuccessModal"> Success </ent-button>
      <ent-button type="error" class="mr-2" @click="handleErrorModal"> Error </ent-button>
      <ent-button type="warning" class="mr-2" @click="handleWarningModal"> Warning </ent-button>
      <ent-button type="warning" class="mr-2" @click="handleAjax"> test ajax error </ent-button>
    </ent-collapse-container>

    <ent-collapse-container class="w-full h-32 mt-5 rounded-md" title="Notification 用法与上面一致">
      <ent-button type="success" class="mr-2" @click="handleNotify"> Success </ent-button>
    </ent-collapse-container>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { defHttp } from 'fe-ent-core/es/utils';
  import { useMessage } from 'fe-ent-core/es/hooks';

  export default defineComponent({
    setup() {
      const {
        createMessage,
        createConfirm,
        createSuccessModal,
        createInfoModal,
        createErrorModal,
        createWarningModal,
        notification
      } = useMessage();
      const { info, success, warning, error } = createMessage;

      function handleLoading() {
        createMessage.loading('Loading...');
      }
      function handleConfirm(type: 'warning' | 'error' | 'success' | 'info') {
        createConfirm({
          iconType: type,
          title: 'Tip',
          content: 'content message...'
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
            orgId: -1
          }
        });
      }
      function handleNotify() {
        notification.success({
          message: 'Tip',
          description: 'content message...'
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
        handleAjax
      };
    }
  });
</script>
