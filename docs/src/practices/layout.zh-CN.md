```yaml
meta:
  type: 最佳实践
title: 布局
description: 页面通用布局
```

## 布局

目前提供的默认布局只有一套，应用到了所有路由页面上，包含侧边菜单栏，顶部通知栏，页脚和内容区域。

默认布局来自fe-ent-page，需要在main.ts中初始化

```typescript
import { initRouteAndLayout, getBasicRoutes } from 'fe-ent-layout';

```
初始化
```typescript

initRouteAndLayout(app);

entRouter.addBasicRoutes(getBasicRoutes());
entRouter.addBizRoutes(import.meta.globEager(`/src/routes/modules/**/*.ts`));

app.use(entRouter);

```
