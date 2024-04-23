<!--
 Access control component for fine-grained access control.
-->
<script lang="ts">
  import { defineComponent } from 'vue';
  import { usePermission } from '../../../hooks/web/use-permission';
  import { getSlot } from '../../../utils/helper/tsx-helper';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'EntAuthority',
    props: {
      /**
       * @en Specified role /permission code
       * @zh 指定角色或者权限代码
       * @default ''
       */
      value: {
        type: [String, Array] as PropType<string | string[]>,
        default: ''
      }
    },
    setup(props, { slots }) {
      const { hasPermission } = usePermission();

      /**
       * Render role button
       */
      function renderAuth() {
        const { value } = props;
        if (!value) {
          return getSlot(slots);
        }
        return hasPermission(value) ? getSlot(slots) : null;
      }

      return () => {
        // Role-based value control
        return renderAuth();
      };
    }
  });
</script>
