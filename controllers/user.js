const resData = require('../helper/response');

module.exports = {
    getUser: async (req, res, next) => {
        try {
            let {id} = req.user;
            let user = await req.userUC.getUserByID(id);

            if (user.isSuccess === false ) {
                return res.status(user.statusCode).json(resData.failed(user.reason));
            }

            return res.status(user.statusCode).json(resData.success(user.data))
        }catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            let {id} = req.user;
            let {name, username, phone} = req.body;
            let user = await req.userUC.updateUser(id, name, username, phone);

            if (user.isSuccess === false ) {
                return res.status(user.statusCode).json(resData.failed(user.reason));
            }

            return res.status(user.statusCode).json(resData.success(user.data))
        }catch (e) {
            next(e);
        }
    },

    // updatePassword: async (req, res, next) => {
    //     try {
    //         let {id} = req.user;
    //         let {oldPass, newPass, confirmNewPass} = req.body;
    //         let user = await req.userUC.updatePassword(id, oldPass, newPass, confirmNewPass);

    //         if (user.isSuccess === false ) {
    //             return res.status(user.statusCode).json(resData.failed(user.reason));
    //         }

    //         return res.status(user.statusCode).json(resData.success(user.data))
    //     }catch (e) {
    //         next(e);
    //     }
    // }

    

}