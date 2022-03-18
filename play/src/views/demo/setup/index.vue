<template>
  <EntPageWrapper title="引导页" content="用于给用户的指引操作">
    <a-button type="primary" @click="handleStart">开始</a-button>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import { useDesign } from 'fe-ent-core/lib/hooks/web/use-design';
  import intro from 'intro.js';
  import 'intro.js/minified/introjs.min.css';

  export default defineComponent({
    components: { EntPageWrapper },
    setup() {
      const { prefixVar } = useDesign('');

      function handleStart() {
        intro()
          .setOptions({
            steps: [
              {
                title: 'Welcome',
                intro: 'Hello World! 👋',
              },
              {
                title: 'Collapse Button',
                element: document.querySelector(`.${prefixVar}-layout-header-trigger`)!,
                intro: 'This is the menu collapse button.',
              },
              {
                title: 'User Action',
                element: document.querySelector(`.${prefixVar}-layout-header-action`)!,
                intro: 'This is the user function area.',
              },
            ],
          })
          .start();
      }
      return { handleStart };
    },
  });
</script>
