<template>
  <EntPageWrapper title="表单增删示例">
    <CollapseContainer title="表单增删">
      <EntForm @register="register" @submit="handleSubmit">
        <template #add="{ field }">
          <EntButton v-if="Number(field) === 0" @click="add">+</EntButton>
          <EntButton v-if="field > 0" @click="del(field)">-</EntButton>
        </template>
      </EntForm>
    </CollapseContainer>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntForm, useForm } from 'fe-ent-core/lib/components/form';
  import { EntCollapseContainer } from 'fe-ent-core/lib/components/container';
  import { Input } from 'ant-design-vue';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import { EntButton } from 'fe-ent-core/lib/components/Button';

  export default defineComponent({
    components: {
      EntForm,
      CollapseContainer: EntCollapseContainer,
      EntPageWrapper,
      [Input.name]: Input,
      EntButton,
    },
    setup() {
      const [register, { appendSchemaByField, removeSchemaByFiled, validate }] = useForm({
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
            label: '字段' + n.value,
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
            label: '字段' + n.value,
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
        removeSchemaByFiled([`field${field}a`, `field${field}b`, `${field}`]);
        n.value--;
      }

      return { register, handleSubmit, add, del };
    },
  });
</script>
