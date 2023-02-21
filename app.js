const express = require('express')
const app = express()
const cors = require('cors')
const { Op } = require('sequelize')

// const Account = require('./models/Account.js')

app.use(cors())

const userRouter = require('./router/user.js')
app.use('/api/user/v1', userRouter)

app.listen(3002, () => {
    console.log('服务运行在3002端口')
})