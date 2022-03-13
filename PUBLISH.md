## 环境搭建

### 前端VUE

请注意node的版本，在用户目录增加 .npmrc文件并添加以下内容

```
registry=http://npm.36cpc.com/repository/npm-public/
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

#### 前端工程发布

##### 发布到snapshots

- 添加用户

```bash
npm adduser -registry http://npm.36cpc.com/repository/npm-snapshots/
```
登录账号 npm-deploy deploy@20120
根据提示输入用户、密码，邮箱，登录成功后会把授权信息，保存在npmrc文件


- 确认要发布的版本，TAG_VERSION，比如1.0.3，修改版本
```bash
TAG_VERSION=1.0.1 pnpm update:version
```
- 构建新版本
```bash
pnpm build:all
```
- 推送
```bash
 pnpm remote
```

- 项目使用，在项目根目录新增.npmrc文件，并在文件添加
```
shamefully-hoist=true
registry=http://npm.36cpc.com/repository/npm-public/
```

清理pnpm 缓存
``` 
rm -rf node_modules/.pnpm
``` 

