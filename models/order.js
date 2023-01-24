'use strict'
const {Model} = require('sequelize');
const {nanoid} = require('nanoid');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: {name: 'user_id', allowNull: false},
                as: 'user'
            });
            this.belongsToMany(models.Product, {
                through: 'order_products',
                as: 'products'
            });
        }
    };

    Order.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(16),
            defaultValue: nanoid(16)
        },
        user_id: DataTypes.INTEGER,
        status: DataTypes.STRING,
        completed_date: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Order',
    },
    );
    return Order;
}