const express = require('express')
const userHandler = require('../router_handler/user')
const router = express.Router()
router.post('/reg', userHandler.reg_User)
router.post('/login',userHandler.login_User)
router.get('/username/:name',userHandler.getUserCreateName)
router.get('/userinfo/:name',userHandler.getUserInfo)
router.post('/editCreateName',userHandler.editCreateName)
module.exports = router
