
import express from "express";
import { productController } from "../controllers/productController.js";
import {protect} from "../middleware/authMiddleware.js"
import { getProductController } from "../controllers/productController.js";
const Router = express.Router();

Router.get("/",protect,getProductController)
Router.post("/",protect,productController);

export default Router;