<template>
  <ent-page-wrapper title="表单增删示例">
    <ent-collapse-container title="表单增删">
      <ent-form @register="register" @submit="handleSubmit">
        <template #add="{ field }">
          <ent-button v-if="Number(field) === 0" @click="add">+</ent-button>
          <ent-button v-if="field > 0" @click="del(field)">-</ent-button>
        </template>
      </ent-form>
    </ent-collapse-container>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useForm } from 'fe-ent-core/es/components/form';
  import { Input } from 'ant-design-vue';

  export default defineComponent({
    components: {
      [Input.name]: Input,
    },
    setup() {
      const [register, { appendSchemaByField, removeSchemaByField, validate }] = useForm({
        schemas: [
          {
            field: 'field0a',
            component: 'Input',
            label: '字段0',
            colProps: {
              span: 8,
            },
            required: true,
          },
          {
            field: 'field0b',
            component: 'Input',
            label: '字段0',
            colProps: {
              span: 8,
            },
            required: true,
          },
          {
            field: '0',
            component: 'Input',
            label: ' ',
            colProps: {
              span: 8,
            },
            slot: 'add',
          },
        ],
        labelWidth: 100,
        actionColOptions: { span: 24 },
      });

      async function handleSubmit() {
        try {
          const data = await validate();
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      }

      const n = ref(1);

      function add() {
        appendSchemaByField(
          {
            field: `field${n.value}a`,
            component: 'Input',
            label: `字段${n.value}`,
            colProps: {
              span: 8,
            },
            required: true,
          },
          '',
        );
        appendSchemaByField(
          {
            field: `field${n.value}b`,
            component: 'Input',
            label: `字段${n.value}`,
            colProps: {
              span: 8,
            },
            required: true,
          },
          '',
        );

        appendSchemaByField(
          {
            field: `${n.value}`,
            component: 'Input',
            label: ' ',
            colProps: {
              span: 8,
            },
            slot: 'add',
          },
          '',
        );
        n.value++;
      }

      function del(field) {
        removeSchemaByField([`field${field}a`, `field${field}b`, `${field}`]);
        n.value--;
      }

      return { register, handleSubmit, add, del };
    },
  });
</script>
