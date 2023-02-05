const resData = require('../helper/response');

module.exports = {
    getAllCategory: async (req, res, next) => {
        try {
            let category = await req.categoryUC.getAllCategory();

            return res.status(200).json(resData.success(category.data));
        } catch (e) {
            next(e);
        }
    }
}