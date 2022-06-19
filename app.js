const express = require('express')
const app = express()
const cors = require('cors')
const con = require('config');
const port = con.get('server.port');
const host = con.get('server.host');
// 这里的cors()的括号一定要加
app.use(cors())
const joi = require('joi')
// 下面是导入路由
const UserRouter = require('./router/user')
const TaskRouter = require('./router/task')
const TimeRouter = require('./router/time')
const DiaryRouter = require('./router/diary')
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
app.use('/task', TaskRouter)
app.use('/time', TimeRouter)
app.use('/diary', DiaryRouter)
// app.listen(9000, () => {
//     console.log('api server running at http://127.0.0.1')
// })
app.listen(9000, host, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on ${host}:${port}`);
});