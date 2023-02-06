const express = require('express');

const router = express.Router();

//Router
const category = require('../controllers/category');
const product = require('../controllers/product');

// product
router.get('/public/product', product.getListProduct);
router.get('/public/product/:id', product.getProductById);

// category
router.get('/public/category', category.getAllCategory);
// router.get('/public/category/:id', category.getCategoryById);

module.exports = router;
