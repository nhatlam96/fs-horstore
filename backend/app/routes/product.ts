// Import express and create a router
import express from 'express';
const router = express.Router();

// Import productController functions
import {
    getMainCategoriesGateway,
    getProductsGateway,
    getProductByIdGateway,
    getSuggestionsGateway,
    setFiltersGateway,
    updateByIdGateway,
} from '../controllers/product';

// Define API routes
router.get('/products/categories', getMainCategoriesGateway);
router.get('/products/', getProductsGateway);
router.get('/products/category/:category?', getProductsGateway);
router.get('/products/suggestions', getSuggestionsGateway);
router.get('/products/filters', setFiltersGateway);
router.get('/product/id/:id', getProductByIdGateway);
router.put('/product/update/:id', updateByIdGateway);

// Export the productRouter
export { router };