```yaml
meta:
  type: 最佳实践
title: 目录结构
description: 项目文件的组织结构
```

## 目录

```
├── README.md
├── package.json
├── index.html
├── mock  # 模拟数据
├── src
│   ├── api  # 请求接口
│   ├── assets  # 静态资源
│   ├── components  # 通用业务组件
│   ├── directives # 指令集（如需，可自行补充）
│   ├── hooks # 全局hooks
│   ├── locale  # 国际化语言包
│   ├── views  # 页面模板
│   ├── routers # 路由配置
│   ├── store  # 状态管理中心
│   └── utils  # 工具库
│   └── App.vue  # 视图入口
│   └── main.ts  # 入口文件
└── tsconfig.json
```
