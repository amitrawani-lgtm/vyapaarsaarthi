import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createOrder, getOrderCondroller } from "../controllers/orderController.js";

const Router = express.Router();

Router.get("/",protect,getOrderCondroller);
Router.post("/", createOrder);

export default Router;
