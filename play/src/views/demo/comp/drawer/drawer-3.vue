<template>
  <EntDrawer v-bind="$attrs" title="Modal Title" width="50%" show-footer @ok="handleOk">
    <p v-for="index in 40" :key="index" class="h-20">根据屏幕高度自适应</p>
    <template #insertFooter>
      <ent-button> btn</ent-button>
    </template>
    <template #centerFooter>
      <ent-button> btn2</ent-button>
    </template>

    <template #appendFooter>
      <ent-button> btn3</ent-button>
    </template>

    <!-- <template #footer>
      <ent-button> customerFooter</ent-button>
    </template> -->
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntDrawer } from 'fe-ent-core';
  export default defineComponent({
    components: { EntDrawer },
    setup() {
      return {
        handleOk: () => {
          console.log('=====================');
          console.log('ok');
          console.log('======================');
        },
      };
    },
  });
</script>
