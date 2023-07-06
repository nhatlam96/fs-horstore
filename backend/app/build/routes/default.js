"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// Import entry point gateways
const default_1 = require("../controllers/default");
// Import express and create a router
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
// Define API routes
router.get("/", default_1.getHomepage);
router.get("/favicon.ico", default_1.fixFavIcon);
