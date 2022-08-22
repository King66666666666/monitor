const dataApi = require('./api/index');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由

app.use('/api', dataApi);

// 监听端口
app.listen(3000,()=>{
  console.log('服务已启动 http://127.0.0.1:3000')
});
