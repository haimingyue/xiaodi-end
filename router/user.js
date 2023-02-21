const express = require('express')
const UserController = require('../controller/UserController')

const router = express.Router()

// 登录接口
router.get('/login', UserController.login)

module.exports = router