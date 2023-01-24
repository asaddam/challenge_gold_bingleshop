'use strict'
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
        this.hasMany(models.Product, {
            foreignKey: {name: 'category_id', allowNull: false},
            as: 'product'
        });
        }
    };

    Category.init({
            name: DataTypes.STRING,
        }, {
            sequelize,
            modelName: 'Category',
        },
    );
    return Category;
}