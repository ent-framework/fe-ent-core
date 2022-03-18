<template>
  <EntPageWrapper title="打印示例">
    <CollapseContainer title="json打印表格">
      <a-button type="primary" @click="jsonPrint">打印</a-button>
    </CollapseContainer>

    <a-button type="primary" class="mt-5" @click="imagePrint">Image Print</a-button>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import { EntCollapseContainer } from 'fe-ent-core/lib/components/container';

  import printJS from 'print-js';

  export default defineComponent({
    name: 'AppLogo',
    components: { EntPageWrapper, CollapseContainer: EntCollapseContainer },
    setup() {
      function jsonPrint() {
        printJS({
          printable: [
            { name: 'll', email: '123@gmail.com', phone: '123' },
            { name: 'qq', email: '456@gmail.com', phone: '456' },
          ],
          properties: ['name', 'email', 'phone'],
          type: 'json',
        });
      }

      function imagePrint() {
        printJS({
          printable: [
            'https://anncwb.github.io/anncwb/images/preview1.png',
            'https://anncwb.github.io/anncwb/images/preview2.png',
          ],
          type: 'image',
          header: 'Multiple Images',
          imageStyle: 'width:100%;',
        });
      }
      return {
        jsonPrint,
        imagePrint,
      };
    },
  });
</script>
