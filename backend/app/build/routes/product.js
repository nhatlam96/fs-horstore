"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// Import express and create a router
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
// Import productController functions
const product_1 = require("../controllers/product");
// Define API routes
router.get('/products/categories', product_1.getMainCategoriesGateway);
router.get('/products/', product_1.getProductsGateway);
router.get('/products/category/:category?', product_1.getProductsGateway);
router.get('/products/suggestions', product_1.getSuggestionsGateway);
router.get('/products/filters', product_1.setFiltersGateway);
router.get('/product/id/:id', product_1.getProductByIdGateway);
router.put('/product/update/:id', product_1.updateByIdGateway);
