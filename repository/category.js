const { Category } = require('../models');

class CategoryRepository {
    constructor() {
        this.model = Category;
    }

    async getAllCategory() {
        return await this.model.findAll();
    }

    async getCategoryById(id) {
        return await this.model.findOne({
            where: {
                id: id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

    async getCategoryByName(name) {
        return await this.model.findOne({
            where: {
                name: name
            }
        });
    }

    async addCategory(category) {
        return await this.model.create(category);
    }

    async updateCategory(category, id) {
        return this.model.update(category, {
            where: {
                id: id
            }
        });
    }

    async deleteCategory(id) {
        return this.model.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = CategoryRepository;