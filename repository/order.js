const { Op } = require('sequelize');
const orderConstants = require('../helper/constant/order');
const { Order, OrderDetail, User } = require('../models');

class OrderRepository {
    constructor() {
        this.model = Order;
    }

    async createOrder(order) {
        return await this.model.create(order);
    }

    async getOrderById(orderId) {
        return await this.model.findOne({
            where: {
                id: orderId
            },
            include: [
                {
                    model: OrderDetail,
                    as:'order_details',
                    attributes: ['id', 'product_id', 'quantity', 'total_price']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'username', 'phone']
                }
            ]
        });
    }

    async getPendingOrderByUserId(userId) {
        return await this.model.findOne({
            where: {
                user_id: userId,
                status: orderConstants.ORDER_PENDING
            },
            include: [
                {
                    model: OrderDetail,
                    as:'order_details',
                    attributes: ['id', 'product_id', 'quantity', 'total_price']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'username', 'phone']
                },
            ]
        });
    }

    async getListOrder(filter) {
        return await this.model.findAll(filter);
    }

    // async verifyOrderWithoutStatusPending(orderId) {
    //     return await this.model.findOne({
    //         where: {
    //             id: orderId,
    //             status: {
    //                 [Op.not]: "PENDING"
    //             }
    //         }
    //     });
    // }

    async updateOrder(order, id) {
        return this.model.update(order, {
            where: {
                id: id
            }
        });
    }

    async deleteOrder(id) {
        return this.model.destroy({
            where: {
                id: id
            }
        });
    }

}