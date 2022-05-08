# 										Node过程全述

#### 写这个小项目的初因：

​		我希望自己开发一款pc和微信小程序数据互通的学习类软件，功能以自律学习为主。

开始：

node是通过webstorm快速创建

```
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "express": "^4.17.3"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "element-ui": "^2.15.6",
    "express-jwt": "^5.3.3",
    "i": "^0.3.7",
    "joi": "^17.6.0",
    "jsonwebtoken": "^8.5.1",
    "mysql": "^2.18.1",
    "nodemon": "^2.0.15"
  }
}
```

app.js

```
const express = require('express')
const app = express()
app.listen(9000, () => {
    console.log('api server running at http://127.0.0.1')
})
```

配置数据库

```
const mysql = require('mysql')
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'xxt'
})
module.exports = db
```

```
// 通过如下的代码，配置解析 `application/x-www-form-urlencoded` 格式的表单数据的中间件：
app.use(express.urlencoded({ extended: false}))
const bodyParser = require('body-parser');
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
```

```
const express = require('express')
const app = express()
const cors = require('cors')
// 这里的cors()的括号一定要加
app.use(cors())
const joi = require('joi')
// 下面是导入路由
const UserRouter = require('./router/user')

// 通过如下的代码，配置解析 `application/x-www-form-urlencoded` 格式的表单数据的中间件：
app.use(express.urlencoded({ extended: false}))
const bodyParser = require('body-parser');
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

//必须在路由的配置前进行配置解析Token的中间件
const expressJWT = require('express-jwt')
// config保存token的密钥
const config = require('./config')
//设置res.cc全局处理函数优化处理函数,必须在路由之前声明这个
app.use((req, res, next) => {
    res.cc = (err, status = 201) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})
// 配置路由接口
app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: [/^\/user/]}))
app.use('/user', UserRouter)
```

下面是关于我待办列表这个功能里面的一些开发记录：

进入页面需要获取项目名称，项目列表，池子列表

获得项目名称：

```sql
select DISTINCT ptitle from pool where no in (select no from task where username = ? )
? 里为用户名 
```

添加池子的列表：

添加 标题 no 项目名称 
