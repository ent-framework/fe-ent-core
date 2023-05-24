<template>
  <ent-page-wrapper title="右键菜单示例">
    <ent-collapse-container title="Simple">
      <ent-button type="primary" @contextmenu="handleContext"> Right Click on me </ent-button>
    </ent-collapse-container>

    <ent-collapse-container title="Multiple" class="mt-4">
      <ent-button type="primary" @contextmenu="handleMultipleContext">
        Right Click on me
      </ent-button>
    </ent-collapse-container>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useContextMenu, useMessage } from 'fe-ent-core';

  export default defineComponent({
    setup() {
      const [createContextMenu] = useContextMenu();
      const { createMessage } = useMessage();
      function handleContext(e: MouseEvent) {
        createContextMenu({
          event: e,
          items: [
            {
              label: 'New',
              icon: 'bi:plus',
              handler: () => {
                createMessage.success('click new');
              },
            },
            {
              label: 'Open',
              icon: 'bx:bxs-folder-open',
              handler: () => {
                createMessage.success('click open');
              },
            },
          ],
        });
      }

      function handleMultipleContext(e: MouseEvent) {
        createContextMenu({
          event: e,
          items: [
            {
              label: 'New',
              icon: 'bi:plus',

              children: [
                {
                  label: 'New1-1',
                  icon: 'bi:plus',
                  divider: true,
                  children: [
                    {
                      label: 'New1-1-1',
                      handler: () => {
                        createMessage.success('click new');
                      },
                    },
                    {
                      label: 'New1-2-1',
                      disabled: true,
                    },
                  ],
                },
                {
                  label: 'New1-2',
                  icon: 'bi:plus',
                },
              ],
            },
          ],
        });
      }

      return { handleContext, handleMultipleContext };
    },
  });
</script>
