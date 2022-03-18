<template>
  <EntDrawer v-bind="$attrs" title="Modal Title" width="50%" showFooter @ok="handleOk">
    <p class="h-20" v-for="index in 40" :key="index">根据屏幕高度自适应</p>
    <template #insertFooter>
      <a-button> btn</a-button>
    </template>
    <template #centerFooter>
      <a-button> btn2</a-button>
    </template>

    <template #appendFooter>
      <a-button> btn3</a-button>
    </template>

    <!-- <template #footer>
      <a-button> customerFooter</a-button>
    </template> -->
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntDrawer } from 'fe-ent-core/lib/components/drawer';
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
