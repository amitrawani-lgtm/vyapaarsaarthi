const { GoogleGenerativeAI } = require("@google/generative-ai");
const productService = require("./productService");
const orderService = require("./orderService");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define Tools
const tools = [
    {
        functionDeclarations: [
            {
                name: "add_inventory",
                description: "Add new product to inventory or update stock of existing product.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        name: { type: "STRING", description: "Name of the product" },
                        quantity: { type: "NUMBER", description: "Quantity to add" },
                        price: { type: "NUMBER", description: "Price per unit (if new product)" },
                        category: { type: "STRING", description: "Category of the product" }
                    },
                    required: ["name", "quantity"]
                }
            },
            {
                name: "check_inventory",
                description: "Check stock level of products.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        query: { type: "STRING", description: "Product name to search for (optional, lists all if empty)" }
                    }
                }
            },
            {
                name: "create_order",
                description: "Create a new sales order.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        customerName: { type: "STRING", description: "Name of customer" },
                        items: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    name: { type: "STRING", description: "Product name" },
                                    quantity: { type: "NUMBER", description: "Quantity" }
                                },
                                required: ["name", "quantity"]
                            }
                        }
                    },
                    required: ["items"]
                }
            }
        ]
    }
];

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    tools: tools
});

/**
 * Generate response from Gemini model with Function Calling
 */
const generateResponse = async (prompt, files = [], userId) => {
    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "You are VyapaarSaarthi, an intelligent business assistant for MSMEs. You help manage inventory, orders, and provide insights. Always be polite and helpful. Speak in Hinglish (Hindi+English mix) if appropriate." }]
                },
                {
                    role: "model",
                    parts: [{ text: "Namaste! Main VyapaarSaarthi hu. Bataiye aaj main aapki kya madad kar sakta hu?" }]
                }
            ]
        });

        const parts = [];
        if (prompt) parts.push({ text: prompt });

        // Add files
        if (files.length > 0) {
            files.forEach(file => {
                parts.push({
                    inlineData: {
                        data: file.buffer.toString("base64"),
                        mimeType: file.mimetype
                    }
                });
            });
        }

        const result = await chat.sendMessage(parts);
        const response = await result.response;

        // Check for function calls
        const functionCalls = response.functionCalls();

        if (functionCalls && functionCalls.length > 0) {
            // Execute first function call (simplify for V1)
            const call = functionCalls[0];
            const { name, args } = call;
            let apiResponse = null;

            try {
                if (name === "add_inventory") {
                    // Check if updating or adding new
                    // For simplicity, try updateStock first, if fails then addProduct (if price provided)
                    // Simplified logic: Assume addProduct if price is there, updateStock otherwise
                    if (args.price) {
                        apiResponse = await productService.addProduct(args, userId);
                        apiResponse = `Added new product: ${apiResponse.name}`;
                    } else {
                        try {
                            apiResponse = await productService.updateStock(args.name, args.quantity, userId);
                            apiResponse = `Updated stock for ${apiResponse.name}. New stock: ${apiResponse.stock}`;
                        } catch (stockError) {
                            if (stockError.message.includes('not found')) {
                                apiResponse = `Product '${args.name}' not found. To create it, please provide the price (e.g., "Add ${args.quantity} ${args.name} at 100 rupees").`;
                            } else {
                                throw stockError;
                            }
                        }
                    }
                } else if (name === "check_inventory") {
                    const products = await productService.getProducts(userId, args.query ? { name: { $regex: new RegExp(args.query, 'i') } } : {});
                    apiResponse = products.map(p => `${p.name}: ${p.stock} units (₹${p.price})`).join("\n") || "No products found.";
                } else if (name === "create_order") {
                    const order = await orderService.createOrder(args, userId);
                    apiResponse = `Order created! Total: ₹${order.totalAmount}. Order ID: ${order._id}`;
                }
            } catch (err) {
                apiResponse = `Error executing ${name}: ${err.message}`;
            }

            // Send function result back to model
            const result2 = await chat.sendMessage([{
                functionResponse: {
                    name: name,
                    response: { result: apiResponse }
                }
            }]);
            return result2.response.text();
        }

        return response.text();
    } catch (error) {
        console.error("AI Service Error:", error);
        return "Maaf kijiye, kuch gadbad ho gayi. Kripya punah prayas karein. (Error: " + error.message + ")";
    }
};

module.exports = { generateResponse };
