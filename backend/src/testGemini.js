// testGemini.js (ESM) — simple runner for parseWhatsappOrder
import "dotenv/config";
import { parseWhatsappOrder } from "./services/aiService.js";

async function main() {
  const out = await parseWhatsappOrder(
    "Send 10 apples",
    "9153357734",
    "8252554378",
  );

  console.log("RESULT:", JSON.stringify(out, null, 2));
}

main().catch((err) => {
  console.error("ERROR:", err.message || err);
  if (err?.stack) console.error(err.stack);
  process.exitCode = 1;
});
