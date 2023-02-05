const { nanoid } = require('nanoid');
const resData = require('../helper/response');

module.exports = {
    createOrder: async (req, res, next) => {
        try {
            const orderId = nanoid(16);
            const userId = req.user.id;
            const { products } = req.body;

            const order = await req.orderUC.createOrder(
                userId,
                orderId,
                products
            );

            if(!order.isSuccess){
                return res.status(400).json(
                    resData.failed(order.reason)
                )
            }

            res.status(201).json(
                resData.success(order.data)
            );

        } catch(e) {
            next(e);
        }
    },

    getListOrder: async (req, res, next) => {
        try {
            const { status } = req.query;
            const order = await req.orderUC.getListOrder(status);

            return res.status(200).json(resData.success(order.data));
        } catch (e) {
            next(e);
        }
    }
}