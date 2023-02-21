const { Account } = require('../config/sequelize')
const UserService = {
    login: async (phone, password) => {
        // raw：true，默认是false，数据都是经过sequelize装饰过的。
        let userInfo = await Account.findAll({
            where: {
                phone
            },
            raw: true
        })
    
        if (userInfo.length === 0) {
            return {
                code: '-1',
                data: '',
                msg: '用户不存在'
            }
        }
    
        if (password) {
            // 判断用户密码是否正确
        }
    
        let token = 'asdasdasdasdasdasdasd'
        return {
            code: '0',
            data: token,
            msg: '登录成功'
        }
    }
}

module.exports = UserService