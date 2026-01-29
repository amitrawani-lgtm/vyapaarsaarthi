import express from "express";
import { whatsappWebhook, verifyWebhook } from "../controllers/aiController.js";

const router = express.Router();

router.get("/whatsapp", verifyWebhook);
router.post("/whatsapp", whatsappWebhook);

export default router;
