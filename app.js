const express = require('express')
const app = express()
const cors = require('cors')
const { Account, Desk, Student, Class, sequelize, Comment, ProductOrder } = require('./config/sequelize')
const { Op } = require('sequelize')

// const Account = require('./models/Account.js')

app.use(cors())

// 增加
app.get('/insert', async (req, res) => {
    await Account.create({
        username: '老王2',
        age: 40,
        hobby: '按摩'
    })
    res.send('添加成功')
})

// 查询
// app.get('/find', async (req, res) => {
//     let resData = await Account.findAll({
//         where: {
//             username: '老王'
//         },
//         raw: true
//     })
//     console.log(resData)
//     res.send(resData)
// })

// 操作符
// app.get('/find', async (req, res) => {
//     let resData = await Account.findAll({
//         where: {
//             username: {
//                 [Op.eq]: '老王'
//             }
//         },
//         raw: true
//     })
//     console.log(resData)
//     res.send(resData)
// })

// 查询多个条件
// app.get('/find', async (req, res) => {
//     let resData = await Account.findAll({
//         where: {
//             hobby: '买包包',
//             age: 40
//         },
//         raw: true
//     })
//     console.log(resData)
//     res.send(resData)
// })

// app.get('/find', async (req, res) => {
//     let resData = await Account.findAll({
//         where: {
//             // hobby: '买包包',
//             // age: 40
//             [Op.or]: {
//                 hobby: '买包包',
//                 age: 40
//             }
//         },
//         raw: true
//     })
//     console.log(resData)
//     res.send(resData)
// })

// update
app.get('/update', async (req, res) => {
    await Account.update({username: '老六'}, {
        where: {
            username: '老王'
        }
    })
    res.send('更改成功')
})

// 删除
app.get('/delete', async (req, res) => {
    await Account.destroy({
        where: {
            username: '老六'
        }
    })
    res.send('删除成功')
})

// 一对一学生和桌子的关联查询
app.get('/desk', async (req, res) => {
    let resData = await Desk.findAll({
        include: {
            model: Student,
            as: 'studentDetail'
        }
    })
    res.send(resData)
})

// 一对一学生和桌子的关联查询
app.get('/student', async (req, res) => {
    let resData = await Student.findAll({
        include: {
            model: Desk,
            as: 'deskDetail'
        }
    })
    res.send(resData)
})

// 查班级表 班级和学生的一对多关联查询
app.get('/class', async (req, res) => {
    let resData = await Class.findAll({
        include: {
            model: Student,
            as: 'studentList'
        }
    })
    res.send(resData)
})


// 查班级表 班级和学生的一对多关联查询
app.get('/student_class', async (req, res) => {
    let resData = await Student.findAll({
        include: {
            model: Class,
            as: 'classDetail'
        }
    })
    res.send(resData)
})


// 非托管事务
app.get('/comment', async (req, res) => {
    // 1. 开启一个事务
    const t = await sequelize.transaction()
    try {
        // 2. 事务必须以参数的形式传递到数据库操作中
        await Comment.create({
            content: '老王真帅',
            order_num: '456'
        }, {
            transaction: t
        })
        await ProductOrde.update({
            is_comment: 1
        }, {
            where: {
                order_num: '456'
            },
            transaction: t
        })
        // 3. 都成功的时候提交事务
        t.commit()
        res.send('成功了')
    } catch (error) {
        // 4. 发生错误，回滚事务
        await t.rollback()
        res.send('失败了')
    }
})


// 2托管事务
app.get('/comment2', async (req, res) => {
    try {
        await sequelize.transaction(async(t) => {
            await Comment.create({
                content: '老王真帅',
                order_num: '456'
            }, {
                transaction: t
            })
            await ProductOrder.update({
                is_comment: 1
            }, {
                where: {
                    order_num: '456'
                },
                transaction: t
            })
        })
        res.send('成功')
    } catch (error) {
        res.send('失败')
    }
    
})


app.listen(3002, () => {
    console.log('服务运行在3002端口')
})