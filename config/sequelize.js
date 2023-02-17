const { Sequelize } = require('sequelize')

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

module.exports = sequelize