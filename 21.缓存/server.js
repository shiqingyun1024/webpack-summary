/*
  服务器代码
  启动服务器指令：
  先安装nodemon   npm i nodemon -g
  nodemon server.js
  或者
  不安装包，直接运行 node server.js

  访问服务器地址：
  http://localhost:8080
*/ 
const express = require('express');

const app = express();

app.use(express.static('build',{maxAge:1000*3600}));
app.listen(8080)