```yaml
meta:
  type: 开发指南
title: 定制主题
description: EntCore提供了一套蓝色主题，用户可以根据自己的需求定制新主题，以满足业务和品牌上的多样化需求。
```

ArcoDesign定义了一套默认粒子变量，可以通过对粒子变量的修改覆盖来定制主题。

## Less 变量替换

Ant Design Vue 使用了 [Less](http://lesscss.org/ "_blank") 作为预编译语言，通过 Less 的 **modifyVars** 功能，可以很方便的对样式粒子变量进行定制。

通过改变全局变量可在 `global.less (@arco-design/web-vue/es/style/theme/global.less)` 中可以找到。

在组件库内部我们对组件样式变量做了非常细致的抽离提取，可以满足对组件细粒度的定制。例如 `Button` 组件对应的样式变量 `token.less (@arco-design/web-vue/es/button/style/token.less)` 列表。

### 引入组件库样式文件

如果想要进行主题定制，需要引入 less 样式文件。组件库 less 样式文件可以在 `@arco-design/web-vue/dist/arco.less` 或者 `@arco-design/web-vue/es/index.less` 中找到。
如果使用了按需加载的方式引入组件，请确保在按需加载插件中开启了 less 样式文件的导入。

### Vite配置
Vite 本身支持 [Less语法](https://vitejs.dev/guide/features.html#css-pre-processors "_blank") ，用户只需在配置文件中传入Less的配置即可：

```diff
// vite.config.js
export default {
  css: {
+   preprocessorOptions: {
+     less: {
+       modifyVars: {
+         'arcoblue-6': '#f85959',
+       },
+       javascriptEnabled: true,
+     }
+   }
  },
  ...
}
```
