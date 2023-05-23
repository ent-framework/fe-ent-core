```yaml
meta:
  type: 开发指南
title: 定制主题
description: EntCore提供了一套蓝色主题，用户可以根据自己的需求定制新主题，以满足业务和品牌上的多样化需求。
```

## Less 变量替换

Ant Design Vue 使用了 [Less](http://lesscss.org/ "_blank") 作为预编译语言，通过 Less 的 **modifyVars** 功能，可以很方便的对样式粒子变量进行定制。

通过改变全局变量可在 `global.less (fe-ent-core/es/theme/config.less)` 中可以找到，并支持修改Ant Design Vue中的变量


### 引入组件库样式文件

如果想要进行主题定制，需要引入 less 样式文件， `ant-design-vue/dist/antd.less` 和 `fe-ent-core/es/theme/index.less` 。

### Vite配置
Vite 本身支持 [Less语法](https://vitejs.dev/guide/features.html#css-pre-processors "_blank") ，用户只需在配置文件中传入Less的配置即可：

```diff
// vite.config.js
export default {
  css: {
+   preprocessorOptions: {
+     less: {
+       modifyVars: {
+         'primary-color': '#f85959',
+       },
+       javascriptEnabled: true,
+     }
+   }
  },
  ...
}
```
