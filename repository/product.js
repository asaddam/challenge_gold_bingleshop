const { Product } = require('../models');
const { Op } = require('sequelize');

class ProductRepository {
    constructor() {
        this.model = Product;
    }

    async getProductById(id) {
        return await this.model.findOne({
            where: {
                id: id
            }
        });
    }

    async getAllProduct() {
        return await this.model.findAll({
            order: [
                ['id', 'DESC']
            ]
        });
    }

    async getProductByCategoryId(id) {
        return await this.model.findAll({
            where: {
                category_id: id
            }
        });
    }

    async addProduct(product) {
        return await this.model.create(product);
    }

    async updateProduct(product, id) {
        return this.model.update(product, {
            where: {
                id: id
            }
        });
    }

    async deleteProduct(id) {
        return this.model.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = ProductRepository;