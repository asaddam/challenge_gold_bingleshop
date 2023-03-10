class OrderUC {
    constructor(
        orderRepository,
        orderDetailRepository,
        productRepository,
        categoryRepository,
        userRepository,
        orderConstant,
        _,
    ) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.orderConstant = orderConstant;
        this._ = _;
    }

    async getProductByOrderDetail(orderDetail) {
        let result = {
            totalPrice : 0,
            totalQuantity : 0,
            result : [],
        }

        for (let i = 0; i < orderDetail.length; i++) {
            const product = await this.productRepository.getProductById(orderDetail[i].product_id);

            if (product === null) {
                continue;
            }

            const category = await this.categoryRepository.getCategoryById(product.category_id);

            const resultProduct = {
                id: product.id,
                name: product.name,
                category: category.name,
                price: product.price,
                quantity: orderDetail[i].quantity,
                totalPrice: orderDetail[i].total_price,
            };

            result.totalPrice += orderDetail[i].total_price;
            result.totalQuantity += orderDetail[i].quantity;

            result.resultOrderDetail.push(resultProduct);
        }

        return result;
    }

    async getListOrder(status) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: [],
        };

        let filters = {
            where: {
                status: null,
            },
            order: [
                ['created_at', 'DESC'],
            ],
        }

        let listOrder = [];

        if(status !== undefined){
            const statusUpperCase = status.toUpperCase();
            const splitStatus = statusUpperCase.split(',');
            let multipleStatus = [];

            if(splitStatus.length < 2){
                filters.where.status = splitStatus[0].toString();
                listOrder = await this.orderRepository.getListOrder(filters);
            }

            splitStatus.forEach(data => {
                multipleStatus.data.push({ status: data.toUpperCase() })
            });

            listOrder = await this.orderRepository.getListOrderMultipleQuery(multipleStatus)

        } else {
            listOrder = await this.orderRepository.getListOrder();
        }

        result.data = listOrder;
        return result;
    }

    async getOrderById(id) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        const order = await this.orderRepository.getOrderById(id);
        if (order === null) {
            result.reason = 'Order not found';
            return result;
        }

        const product = await this.getProductByOrderDetail(order.order_detail);

        const orderData = {
            id: order.id,
            status: order.status,
            created_at: order.created_at,
            updated_at: order.updated_at,
            quantity: product.totalQuantity,
            total_price: product.totalPrice,
            user: {
                id: order.user.id,
                name: order.user.name,
                username: order.user.username,
                phone: order.user.phone,
            },
            products: product.result,
        }

        result.isSuccess = true;
        result.data = orderData;

        return result;
    }

    async addProductInDetailOrder(userId, orderId, products){
        let orderDetailByProductId = [];

        for(let i = 0; i < products.length; i++){
            if(products[i].quantity < 1){
                continue;
            }
        }

        const getProductById = await this.productRepository.getProductById(products[i].id);

        if(getProductById === null){
        }

        if(getProductById.stock < products[i].quantity){
        }

        const orderDetail = {
            user_id: userId,
            order_id: orderId,
            product_id: products[i].id,
            quantity: products[i].quantity,
            total_price: products[i].quantity * getProductById.price,
        }

        await this.orderDetailRepository.addOrderDetails(orderDetail);
        orderDetailByProductId.push(getProductById);

        return orderDetailByProductId;
    }

    async createOrder(userId, oederId, products) {
        let result = {
            isSuccess: false,
            reason: null,
            data: null,
        }

        const orders = {
            id: orderId,
            user_id: userId,
            status: this.orderConstant.ORDER_PENDING,
        }

        const orderDetail = await this.addProductInDetailOrder(userId, orderId, products);

        if (orderDetail.length < products.length){
            result.reason = "can't procces the order, please check your product in order";
        }

        await this.orderRepository.createOrder(orders);
        result.isSuccess = true;
        result.data = {
            order_id: orderId,
            order_detail: orderDetail,
        }

        return result;
    }
}

module.exports = OrderUC;