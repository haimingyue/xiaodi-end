const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.get('/test', (req, res) => {
    res.send({
        'code': 0,
        'data': [
            {
                id: 1,
                name: '张三'
            }
        ]
    })
})

app.listen(3002, () => {
    console.log('服务运行在3002端口')
})