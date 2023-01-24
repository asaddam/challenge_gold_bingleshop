'use strict'
const {Model} = require('sequelize');
const {nanoid} = require('nanoid');
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        static associate(models) {
            this.belongsTo(models.Order, {
                foreignKey: {name: 'order_id', allowNull: false},
                as: 'order'
            });
        }
    };

    OrderDetail.init({
        user_id: DataTypes.INTEGER,
        order_id: DataTypes.STRING(16),
        product_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        total_price: DataTypes.INTEGER,
        }, {
            sequelize,
            modelName: 'OrderDetail',
        },
    );
    return OrderDetail;
}