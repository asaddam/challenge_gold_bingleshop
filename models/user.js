'use strict'
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // this.hasMany(models.address, {
            //     foreignKey: {name: 'user_id', allowNull: false},
            //     as: 'address'
            // });
            this.hasMany(models.Order, {
                foreignKey: {name: 'user_id', allowNull: false},
                as: 'orders'
            });
        }
    };

    User.init({
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
        phone: DataTypes.STRING,
        is_admin: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'User',
    },
    );
    return User;
}