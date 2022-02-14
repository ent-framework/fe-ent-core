## 环境搭建

### 前端VUE

请注意node的版本，在用户目录增加 .npmrc文件并添加以下内容

```
registry=http://npm.36cpc.com/repository/npm-public/
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

#### 前端工程发布

##### 发布到snapshots

添加用户

```
npm adduser -registry http://npm.36cpc.com/repository/npm-snapshots/
```
登录账号
npm-deploy deploy@20120

根据提示输入用户、密码，邮箱，登录成功后会把授权信息，保存在npmrc文件

在项目根目录执行，发布到远程

``` 
 pnpm -r --no-git-checks publish --tag next --force -registry http://npm.36cpc.com/repository/npm-snapshots/
```

在其他项目使用，在项目根目录新增.npmrc文件，并在文件添加
```
shamefully-hoist=true
registry=http://npm.36cpc.com/repository/npm-public/
```

包开发调试
``` 
pnpm link fe-ent-core
``` 

