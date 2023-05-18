<template>
  <EntPageWrapper title="消息示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Message">
      <ent-button @click="infoMsg('Info message')" class="mr-2"> Info </ent-button>
      <ent-button @click="successMsg('Success message')" class="mr-2" color="success">
        Success
      </ent-button>
      <ent-button @click="warningMsg('Warning message')" class="mr-2" color="warning">
        Warning
      </ent-button>
      <ent-button @click="errorMsg('Error message')" class="mr-2" color="error"> Error </ent-button>
      <ent-button @click="handleLoading" class="mr-2" type="primary"> Loading </ent-button>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Comfirm">
      <ent-button @click="handleConfirm('info')" class="mr-2"> Info </ent-button>
      <ent-button @click="handleConfirm('warning')" color="warning" class="mr-2"> Warning </ent-button>
      <ent-button @click="handleConfirm('success')" color="success" class="mr-2"> Success </ent-button>
      <ent-button @click="handleConfirm('error')" color="error" class="mr-2"> Error </ent-button>
    </CollapseContainer>

    <CollapseContainer class="w-full h-32 mt-5 bg-white rounded-md" title="Modal">
      <ent-button @click="handleInfoModal" class="mr-2"> Info </ent-button>
      <ent-button @click="handleSuccessModal" color="success" class="mr-2"> Success </ent-button>
      <ent-button @click="handleErrorModal" color="error" class="mr-2"> Error </ent-button>
      <ent-button @click="handleWarningModal" color="warning" class="mr-2"> Warning </ent-button>
      <ent-button @click="handleAjax" color="warning" class="mr-2"> test ajax error </ent-button>
    </CollapseContainer>

    <CollapseContainer
      class="w-full h-32 mt-5 bg-white rounded-md"
      title="Notification 用法与上面一致"
    >
      <ent-button @click="handleNotify" color="success" class="mr-2"> Success </ent-button>
    </CollapseContainer>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntCollapseContainer } from '@ent-core/components/container';
  import { useMessage } from '@ent-core/hooks/web/use-message';
  import { EntPageWrapper } from '@ent-core/components/page';
  import { defHttp } from '@ent-core/utils/http/axios';

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
