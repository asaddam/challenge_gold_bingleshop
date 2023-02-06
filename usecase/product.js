class ProductUC{
    constructor(
        productRepository,
        categoryRepository,
        _,
    ) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this._ = _;
    }

    async getAllProduct(filters) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        let products = await this.productRepository.getAllProduct(filters);
        if (products === null) {
            result.reason = 'Product not found';
            return result;
        }

        result.isSuccess = true;
        result.statusCode = 200;
        result.data = products;
        return result;
    }

    async getProductById(id) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        let product = await this.productRepository.getProductById(id);
        if (product === null) {
            result.reason = 'Product not found';
            return result;
        }

        result.isSuccess = true;
        result.statusCode = 200;
        result.data = product;
        return result;

    }

    async addProduct(product) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        let category = await this.categoryRepository.getCategoryById(product.category_id);
        if (category === null) {
            result.reason = 'Failed to add, Category not found';
            return result;
        }

        let productExists = await this.productRepository.getProductByName(product.name);
        if (productExists !== null) {
            result.reason = 'Product already exists';
            return result;
        }

        product = await this.productRepository.addProduct(product);
        result.isSuccess = true;
        result.statusCode = 200;
        result.data = product;
        return result;
    }

    async updateProduct(product, id) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        let productExists = await this.productRepository.getProductById(id);
        if (productExists === null) {
            result.reason = 'Product not found';
            return result;
        }

        product = await this.productRepository.updateProduct(product, id);
        result.isSuccess = true;
        result.statusCode = 200;
        result.data = product;
        return result;
    }
    
    async deleteProduct(id) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        let productExists = await this.productRepository.getProductById(id);
        if (productExists === null) {
            result.reason = 'Product not found';
            return result;
        }

        await this.productRepository.deleteProduct(id);
        result.isSuccess = true;
        result.statusCode = 200;
        return result;
    }
}

module.exports = ProductUC;