const express = require('express')
const app = express()
const cors = require('cors')
const models = require('./models/init-models')
const sequelize = require('./config/sequelize')

// const Account = require('./models/Account.js')

app.use(cors())

app.get('/account', async (req, res) => {
    await models(sequelize).Account.create({
        username: '老王',
        age: 40,
        hobby: '按摩'
    })
    res.send('添加成功')
})

app.listen(3002, () => {
    console.log('服务运行在3002端口')
})