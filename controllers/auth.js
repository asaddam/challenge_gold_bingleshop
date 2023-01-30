const resData = require('../helper/response');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    login: async (req, res, next) => {
        try {
            let {username, password} = req.body;
            let user = await req.authUC.loginUser(username, password);

            if (user.isSuccess === false ) {
                return res.status(user.statusCode).json(resData.failed(user.reason));
            }

            return res.status(200).json(resData.success({
                token: user.token,
                user: user.data
            }))
        }catch (e) {
            next(e);
        }
    },

    register: async (req, res, next) => {
        try {
            let userData = {
                id: uuidv4(),
                name: req.body.name,
                email: req.body.email,
                username: req.body.username, 
                password: req.body.password,
                phone: req.body.phone,
                is_admin: false
            };
            
            console.log("controller : "+ userData);
            let resUser = await req.authUC.registerUser(userData);
            if (resUser.isSuccess === false) {
                return res.status(resUser.statusCode).json(resData.failed(resUser.reason));
            }
    
            return res.status(200).json(resData.success({
                user: resUser.data,
                token: resUser.token
            })); 
        } catch (e) {
            next(e);
        }   
    },
}