## 环境搭建

### 前端VUE

请注意node的版本，在用户目录增加 .npmrc文件并添加以下内容

```
registry=http://localhost:8081/repository/npm-private/
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

#### 前端工程发布

##### 发布到snapshots

- 用户登录

```bash
npm login
```

- 确认要发布的版本，TAG_VERSION，比如1.0.3，修改版本
```bash
TAG_VERSION=3.0.1 pnpm update:version
```
- 构建新版本
```bash
pnpm build:all
```
- 推送
```bash
 pnpm remote
```

清理pnpm 缓存
``` 
rm -rf node_modules/.pnpm
``` 

