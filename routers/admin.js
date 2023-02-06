const express = require('express');

// controller

const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const orderController = require('../controllers/order');

const authorized = require('../middleware/authJwt');
const validation = require('../middleware/formValidation');

const router = express.Router();

// Category
router.get('/admin/category', authorized.isAdmin, validation.category, categoryController.getAllCategory);
// router.put('/admin/category/update/:id', authorized.isAdmin, validation.category, categoryController.putCategory);
// router.delete('/admin/category/delete/:id', authorized.isAdmin, categoryController.deleteCategory);

// Product
// router.post('/api/admin/product/add', authorized.isAdmin, validation.product,  productController.addProduct);
// router.put('/api/admin/product/update/:id', authorized.isAdmin, validation.product, productController.updateProduct);
// router.delete('/api/admin/product/delete/:id', authorized.isAdmin, productController.deleteProduct);

// Order
// router.patch('/api/admin/order/update-status/:id', authorized.isAdmin, validation.statusOrder, orderController.changeStatusOrder);
router.get('/api/admin/order', authorized.isAdmin, orderController.getListOrder);
// router.get('/api/admin/order/:id', authorized.isAdmin, orderController.);

module.exports = router;