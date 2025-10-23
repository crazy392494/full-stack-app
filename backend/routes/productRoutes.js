const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, employee } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProducts)
    .post(protect, employee, createProduct);
    
router.route('/:id')
    .get(getProductById)
    .put(protect, employee, updateProduct)
    .delete(protect, employee, deleteProduct);

module.exports = router;
