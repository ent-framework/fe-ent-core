/**
 * 获取Main组件的Vue代码
 */
import { getTemplateString } from './utils.js';
import type { I18nData } from './interface.js';

export const getMainVue = ({
  html,
  imports,
  components,
  data
}: {
  html: string;
  imports: string[];
  components: string[];
  data: Record<string, any>;
}) => `<template>
  <arco-article v-bind="data" :changelog="changelog">
    ${html}
  </arco-article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLocale } from 'fe-ent-core/es/locales';
${imports.join('\n')};

export default defineComponent({
  name: 'ArcoMain',
  components: { ${components.join(',')} },
  setup() {
    const { getLocale: locale } = useLocale();
    const data = ${JSON.stringify(data)};
    const getMessage = (zh, en) => {
      return locale.value === 'zh_CN' ? zh : en;
    };
    const changelog = typeof _changelog === 'undefined' ? undefined : _changelog;

    return {
      locale,
      data,
      changelog,
      getMessage
    };
  }
});
</script>
`;

export const getDemoVue = ({
  id,
  virtualPath,
  title,
  description,
  code
}: {
  id: string;
  virtualPath: string;
  title: I18nData;
  description: I18nData;
  code: string;
}) => `<template>
  <code-block id="${id}" :title="getMessage(${getTemplateString(
    title['zh-CN']
  )}, ${getTemplateString(title['en-US'])})">
    <template v-if="locale === 'zh_CN'" #description>
      ${description['zh-CN'] ?? ''}
    </template>
    <template v-else #description>
      ${description['en-US'] ?? ''}
    </template>
    <cell-demo>
      <virtual-demo />
    </cell-demo>
    <cell-code>
      ${code}
    </cell-code>
  </code-block>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useLocale } from 'fe-ent-core/es/locales';
import VirtualDemo from '${virtualPath}';

export default defineComponent({
  name: 'ArcoDemo',
  components: { VirtualDemo },
  setup() {
    const { getLocale: locale } = useLocale();
    const getMessage = (zh, en) => {
      return {'zh_CN': zh, 'en': en};
    };

    return {
      locale,
      getMessage
    };
  }
});
</script>
`;
