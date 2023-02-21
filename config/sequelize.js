const { Sequelize } = require('sequelize')
const initModels = require('../models/init-models')

const sequelize = new Sequelize('test', 'root', 'Pass_123', {
    host: '49.234.9.51',
    dialect: 'mysql'
})

async function test () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test()

const models = initModels(sequelize)

// 学生和桌子的一对一关系模型
models.Student.hasOne(models.Desk, { foreignKey: 'student_id', as: 'deskDetail' })
models.Desk.belongsTo(models.Student, { foreignKey: 'student_id', as: 'studentDetail' })

// 班级和学生的一对多的关系模型
models.Class.hasMany(models.Student, { foreignKey: 'class_id', as: 'studentList' })
models.Student.belongsTo(models.Class, { foreignKey: 'class_id', as: 'classDetail' })

module.exports = { sequelize, ...models }