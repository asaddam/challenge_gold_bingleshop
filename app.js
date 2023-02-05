const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const generateToken = require('./helper/jwt');
require('dotenv').config();

const app = express();;

const apiUrl = "/api/v1"

// setting cors
let corsOptions = {
    origin: 'http://localhost:4000',
}
app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const orderConstant = require('./helper/constant/order');

//User
const UserRepository = require('./repository/user');

//Auth
const AuthRepository = require('./repository/auth');
const AuthUseCase = require('./usecase/auth');

const authRouter = require('./routers/auth');

const authUC = new AuthUseCase(
    new UserRepository(),
    new AuthRepository(),
    bcrypt,
    generateToken,
    _
)

//Product
const ProductRepo = require('./repository/product');
const ProductUseCase = require('./usecase/product');

//Category
const CategoryRepository = require('./repository/category');
const CategoryUseCase = require('./usecase/category');

//Order
const OrderRepository = require('./repository/order');
const OrderDetailRepository = require('./repository/orderDetail');
const OrderUseCase = require('./usecase/order');

//UC
const categoryUC = new CategoryUseCase(new CategoryRepository(), new ProductRepo());
const productUC = new ProductUseCase(new ProductRepo(), new CategoryRepository(), _);
const orderUC = new OrderUseCase(new OrderRepository(),
    new OrderDetailRepository(),
    new ProductRepo(),
    new UserRepository(),
    _, orderConstant
)


app.get('/api/v1', (req, res) => {
    res.json({ message: 'welcome' })
});

app.use((req, res, next) => {
    req.authUC = authUC;
    req.productUC = productUC;
    req.categoryUC = categoryUC;
    req.orderUC = orderUC

    next();
});

app.use(`${apiUrl}/`, authRouter)

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on  ${PORT}`);
})