
  import { defineComponent } from 'vue';
  import { NImage } from 'naive-ui';

  export default defineComponent({
    components: { NImage },
    props: {
      fileUrl: {
        type: String,
        default: ''
      },
      fileName: {
        type: String,
        default: ''
      }
    }
  });
