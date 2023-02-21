
const UserService = require('../service/UserService.js')
const UserController = {
    login: async (req, res) => {
        const { phone, password } = req.query
        const resData = await UserService.login(phone, password)
        res.send(resData)
        
    }
}

module.exports = UserController