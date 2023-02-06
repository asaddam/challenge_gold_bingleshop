class CategoryUC {
    constructor(
        categoryRepository,
        productRepository,
    ) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    async getCategoryById(id) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        let category = await this.categoryRepository.getCategoryById(id);
        if (category === null) {
            result.reason = 'Category not found';
            return result;
        }

        let products = await this.productRepository.getProductByCategoryId(category.id);
        let categories = {
            id: category.id,
            name: category.name,
            created_at: category.created_at,
            updated_at: category.updated_at,
            products
        }

        result.isSuccess = true;
        result.data = categories;

        return result;
    }

    async getAllCategory() {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        let categories = await this.categoryRepository.getAllCategory();

        result.isSuccess = true;
        result.data = categories;

        return result;
    }

    async addCategory(category) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        let categories = await this.categoryRepository.addCategory(category);

        result.isSuccess = true;
        result.data = categories;

        return result;
    }

    async updateCategory(category, id) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        const cekCategory = await this.categoryRepository.getCategoryById(id);
        if (cekCategory === null) {
            result.reason = 'Category not found';
            return result;
        }

        let updateCategory = await this.categoryRepository.updateCategory(category, id);

        result.isSuccess = true;
        result.data = updateCategory;

        return result;
    }

    async deleteCategory(id) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        const cekCategory = await this.categoryRepository.getCategoryById(id);
        if (cekCategory === null) {
            result.reason = 'Category not found';
            return result;
        }

        let product = await this.productRepository.getProductByCategoryId(id);
        await this.categoryRepository.deleteCategory(id);
        result.isSuccess = true;
        result.statusCode = 200;

        return result;
    }
}

module.exports = CategoryUC;