'use strict'
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: {name: 'category_id', allowNull: false},
        as: 'category'
      });
      // this.hasMany(models.ProductImage, {
      //   foreignKey: {name: 'product_id', allowNull: false}
      // });
    }
  };

  Product.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        category_id: DataTypes.INTEGER,
        sold: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        stock: DataTypes.INTEGER,
        // product_image_id: DataTypes.INTEGER
      }, {
        sequelize,
        modelName: 'Product',
      },
  );
  return Product;
}