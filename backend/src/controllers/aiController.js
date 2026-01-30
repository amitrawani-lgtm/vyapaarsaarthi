import { parseWhatsappOrder } from "../services/aiService.js";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

// Helper function local to this controller
const handleOrderCreation = async ({ items, buyerPhone, shopkeeperPhone }) => {
  console.log("Processing order for shopkeeper:", shopkeeperPhone);

  let shopkeeper = await User.findOne({
    $or: [
      { number: shopkeeperPhone },
      { number: Number(shopkeeperPhone) } // case where it's a number
    ]
  });

  
  if (!shopkeeper) {
    console.log("Shopkeeper not found by number, falling back to first user for testing...");
    shopkeeper = await User.findOne({});
  }

  if (!shopkeeper) throw new Error("No users found in database at all");

  if (!items || items.length === 0) throw new Error("No items in order");

  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findOne({
      user: shopkeeper._id,
      name: new RegExp(`^${item.name}$`, 'i') // case insensitive match
    });

    if (!product) throw new Error(`Product '${item.name}' not found for user ${shopkeeper.name}`);
    if (product.stock < item.quantity) throw new Error(`Stock insufficient for '${item.name}'`);

    totalAmount += product.price * item.quantity;
    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      priceAtPurchase: product.price,
    });

    // update stock
    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    orderId: `ORD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 900 + 100)}`,
    buyerPhone,
    items: orderItems,
    totalAmount,
    shopkeeper: shopkeeper._id,
    status: "completed"
  });
  console.log("Order Created:", order.orderId);
  return order;
};

// 1️⃣ Verify webhook
export const verifyWebhook = (req, res) => {
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("Webhook Verification Attempt:");
  console.log("- Received Token:", token);
  console.log("- Expected Token:", process.env.WHATSAPP_VERIFY_TOKEN);

  if (token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("Verification SUCCESS");
    return res.status(200).send(challenge);
  }
  console.log("Verification FAILED");
  res.sendStatus(403);
};

// 2️⃣ Handle incoming WhatsApp messages
export const whatsappWebhook = async (req, res) => {
  try {
    console.log("Incoming Webhook Raw Body:", JSON.stringify(req.body, null, 2));

    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    if (!message) {
      console.log("Webhook received but no message found (likely a status update)");
      return res.sendStatus(200);
    }

    const text = message.text?.body ?? "";
    const buyerPhone = message.from;
    // const shopkeeperPhone = value?.metadata?.phone_number_id;     yaha hum change kiye.
    const shopkeeperPhone = value?.metadata?.display_phone_number;


    console.log(`Processing Message: "${text}" from ${buyerPhone}`);

    // 🟡 MANUAL ORDER DETECTION
    if (text.toLowerCase().startsWith("#self")) {
      try {
        const manualOrder = parseSelfOrder(text, buyerPhone, shopkeeperPhone);
        await handleOrderCreation(manualOrder);
      } catch (err) {
        console.error("Manual order failed:", err.message);
      }
      return res.sendStatus(200);
    }

    // 🤖 AI ORDER
    try {
      const structuredOrder = await parseWhatsappOrder(
        text,
        buyerPhone,
        shopkeeperPhone,
      );
      await handleOrderCreation(structuredOrder);
      console.log("AI Order processed successfully");
    } catch (err) {
      console.error("AI order failed:", err.message);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook fatal error:", error);
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
