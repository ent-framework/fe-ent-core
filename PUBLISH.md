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

根据提示输入用户、密码，邮箱，登录成功后会把授权信息，保存在npmrc文件

发布到远程

```
 npm publish -registry http://npm.36cpc.com/repository/npm-snapshots/
```
