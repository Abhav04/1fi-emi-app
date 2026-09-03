const express = require('express');
const { getAllProducts, getProductBySlug } = require('../controllers/productsController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:slug', getProductBySlug);

module.exports = router;
