## Build Setup

```bash
# 克隆项目
git clone https://github.com/King66666666666/monitor.git

# 配置数据库(MySQL)连接
# 进入项目下的server目录
# 修改db.js

mysql: {
    host:'xxx.xxx.xxx.xxx', // 数据库IP地址
    user:'root', // 登录数据库的账号
    password:'********', // 登录数据库的密码
    database:'databaseName' // 指定要操作哪个数据库
  }

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
