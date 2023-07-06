// Export the router
export { router };

// Import entry point gateways
import { getHomepage, fixFavIcon } from '../controllers/default';

// Import express and create a router
import express from "express";
const router = express.Router();

// Define API routes
router.get("/", getHomepage);
router.get("/favicon.ico", fixFavIcon);