import { parseWhatsappOrder } from "../services/aiService.js";
import { createOrder } from "./orderController.js";

// 1️⃣ Verify webhook
export const verifyWebhook = (req, res) => {
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
};

// 2️⃣ Handle incoming WhatsApp messages
export const whatsappWebhook = async (req, res) => {
  try {
    console.log("Incoming WhatsApp webhook:", JSON.stringify(req.body, null, 2));
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (!message) return res.sendStatus(200);

    const text = message.text?.body ?? "";
    const buyerPhone = message.from;
    const shopkeeperPhone = changes.value.metadata.phone_number_id;

    // 🟡 MANUAL ORDER DETECTION
    if (text.toLowerCase().startsWith("#self")) {
      const manualOrder = parseSelfOrder(text, buyerPhone, shopkeeperPhone);
      await createOrder(manualOrder);
      return res.sendStatus(200);
    }

    // 🤖 AI ORDER
    const structuredOrder = await parseWhatsappOrder(
      text,
      buyerPhone,
      shopkeeperPhone,
    );

    await createOrder(structuredOrder);
    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook error:", error);
    res.sendStatus(500);
  }
};

// Manual order parser
function parseSelfOrder(text, buyerPhone, shopkeeperPhone) {
  // Example: "#self keyboard 5"
  const parts = text.replace("#self", "").trim().split(" ");
  return {
    buyerPhone,
    shopkeeperPhone,
    items: [
      {
        name: parts[0],
        quantity: Number(parts[1] || 1),
      },
    ],
  };
}
