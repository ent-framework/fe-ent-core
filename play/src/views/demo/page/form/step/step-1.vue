<template>
  <div class="step1">
    <div class="step1-form">
      <ent-form @register="register">
        <template #fac="{ model, field }">
          <a-form-item-rest>
            <a-input-group compact>
              <a-select v-model:value="model['pay']" class="pay-select">
                <a-select-option value="zfb"> 支付宝 </a-select-option>
                <a-select-option value="yl"> 银联 </a-select-option>
              </a-select>
              <a-input v-model:value="model[field]" class="pay-input" />
            </a-input-group>
          </a-form-item-rest>
        </template>
      </ent-form>
    </div>
    <a-divider />
    <h3>说明</h3>
    <h4>转账到支付宝账户</h4>
    <p>
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
    </p>

    <h4>转账到银行卡</h4>
    <p>
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
    </p>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useForm } from 'fe-ent-core/es/components/form';
  import { Divider, FormItemRest, Input, Select } from 'ant-design-vue';
  import { step1Schemas } from './data';

  export default defineComponent({
    components: {
      [Select.name]: Select,
      ASelectOption: Select.Option,
      [Input.name]: Input,
      [Input.Group.name]: Input.Group,
      [Divider.name]: Divider,
      [FormItemRest.name]: FormItemRest,
    },
    emits: ['next'],
    setup(_, { emit }) {
      const [register, { validate }] = useForm({
        labelWidth: 100,
        schemas: step1Schemas,
        actionColOptions: {
          span: 14,
        },
        showResetButton: false,
        submitButtonOptions: {
          text: '下一步',
        },
        submitFunc: customSubmitFunc,
      });

      async function customSubmitFunc() {
        try {
          const values = await validate();
          emit('next', values);
        } catch {}
      }

      return { register };
    },
  });
</script>
<style lang="less" scoped>
  .step1 {
    &-form {
      width: 450px;
      margin: 0 auto;
    }

    h3 {
      margin: 0 0 12px;
      font-size: 16px;
      line-height: 32px;
      //color: @text-color;
    }

    h4 {
      margin: 0 0 4px;
      font-size: 14px;
      line-height: 22px;
      //color: @text-color;
    }

    p {
      //color: @text-color;
    }
  }

  .pay-select {
    width: 25%;
  }

  .pay-input {
    width: 75%;
  }
</style>
