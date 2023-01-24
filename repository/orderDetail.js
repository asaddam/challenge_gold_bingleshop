const { OrderDetail } = require('../models');

class OrderDetailRepository {
    constructor() {
        this.model = OrderDetail;
    }

    async createOrderDetail(orderDetail) {
        return await this.model.create(orderDetail);
    }

    async getOrderDetailById(orderId) {
        return await this.model.findAll({
            where: {
                order_id: orderId
            }
        });
    }

    async deleteOrderDetail(orderId) {
        return this.model.destroy({
            where: {
                order_id: orderId
            }
        });
    }
}