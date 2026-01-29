import axios from "axios";

// Use a model+method that is widely available for text generation. If you need a different model, use ListModels to discover available models for your account.
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const isKeyPresent = (key) =>
  typeof key === "string" && key.trim() !== "" && !key.includes("YOUR");

// Mock implementation for local dev / tests
const mockParseWhatsappOrder = async (
  message,
  buyerPhone,
  shopkeeperPhone,
) => ({
  buyerPhone,
  shopkeeperPhone,
  items: [
    {
      name: String(message).match(/keyboard|keyboards/i)
        ? "keyboards"
        : "unknown",
      quantity: 5,
    },
  ],
});

export const parseWhatsappOrder = (function createParser() {
  const key = process.env.GEMINI_API_KEY;
  const useMock =
    process.env.AI_MOCK === "1" || process.env.NODE_ENV === "test";

  if (!isKeyPresent(key)) {
    if (useMock) {
      return mockParseWhatsappOrder;
    }

    // return a function that throws a helpful error when called
    return async () => {
      throw new Error(
        "GEMINI_API_KEY is missing or invalid. Set GEMINI_API_KEY in backend/.env or set $env:GEMINI_API_KEY before calling the AI service.",
      );
    };
  }

  // Real implementation (key is present)
  return async (message, buyerPhone, shopkeeperPhone) => {
    const prompt = `\nConvert the following WhatsApp order into JSON.\n\nRules:\n- Output ONLY valid JSON\n- Quantity must be a number\n- If quantity missing, assume 1\n\nMessage:\n"${message}"\n\nOutput format:\n{\n  \"buyerPhone\": ${buyerPhone},\n  \"shopkeeperPhone\": ${shopkeeperPhone},\n  \"items\": [\n    {\n      \"name\": \"item name\",\n      \"quantity\": number\n    }\n  ]\n}\n`;

    try {
      // helper that attempts the configured endpoint first, then falls back to ListModels to discover a compatible model/method
      const callCompatibleModel = async (endpointWithQuery, body) => {
        // try the configured endpoint first
        try {
          return await axios.post(endpointWithQuery, body);
        } catch (err) {
          if (!err?.response || err.response.status !== 404) throw err; // rethrow non-404
        }

        // ListModels fallback
        const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
        const lm = await axios.get(listUrl);
        const models = lm?.data?.models ?? [];
        const prefer = ["flash", "pro", "gemini"];
        const sorted = models.slice().sort((a, b) => {
          const an = String(a.name || a).toLowerCase();
          const bn = String(b.name || b).toLowerCase();
          const ai = prefer.findIndex((p) => an.includes(p));
          const bi = prefer.findIndex((p) => bn.includes(p));
          return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        });

        const candidateMethods = [
          {
            method: "generateContent",
            bodyFactory: (p) => ({ contents: [{ parts: [{ text: p }] }] }),
          },
          {
            method: "generateText",
            bodyFactory: (p) => ({ instances: [{ content: p }] }),
          },
        ];

        for (const m of sorted) {
          const modelName = m?.name || m; // e.g. "models/gemini-1.5-flash"
          // modelName usually comes as "models/foo". The endpoint construction below expects just "foo" if we used the old logic,
          // but v1beta usually works with "models/foo:generateContent".
          // The old code did `models/${modelName}:${cm.method}`.
          // If `modelName` is "models/text-bison-001", then `models/models/text-bison-001` is wrong.
          // API returns "name": "models/gemini-pro".
          // Let's strip "models/" if present to be safe, or just rely on the fallback logic being robust.
          // Actually, simply constructing the URL correctly is better.

          let cleanName = modelName.replace(/^models\//, "");

          if (!cleanName) continue;
          for (const cm of candidateMethods) {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${cleanName}:${cm.method}`;
            try {
              return await axios.post(
                endpoint + `?key=${process.env.GEMINI_API_KEY}`,
                cm.bodyFactory(
                  body?.contents?.[0]?.parts?.[0]?.text ?? body?.instances?.[0]?.content ?? body
                ),
              );
            } catch (err) {
              if (!err?.response || err.response.status !== 404) throw err;
              // otherwise try next
            }
          }
        }

        throw new Error("No compatible model/method found via ListModels");
      };

      const res = await callCompatibleModel(
        `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] },
      );

      // support multiple possible response shapes (defensive)
      const cand =
        res?.data?.candidates?.[0] ??
        res?.data?.candidate ??
        res?.data?.output?.[0];
      const rawCandidates = [
        cand?.content?.parts?.[0]?.text,
        cand?.content?.[0]?.text,
        cand?.output,
        cand?.outputText,
        cand?.text,
        res?.data?.output?.[0]?.content?.[0]?.text,
      ];

      let raw =
        rawCandidates.find(
          (x) => typeof x === "string" && x?.trim?.().length > 0,
        ) ?? null;

      if (!raw) {
        const serverMsg = res?.data ?? "no body";
        throw new Error(
          `Unexpected Gemini response shape: ${JSON.stringify(serverMsg)}`,
        );
      }

      // If the model returned extra commentary + JSON, extract the first JSON object substring
      if (!raw.trim().startsWith("{")) {
        const firstBrace = raw.indexOf("{");
        const lastBrace = raw.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          raw = raw.slice(firstBrace, lastBrace + 1);
        }
      }

      try {
        return JSON.parse(raw);
      } catch (err) {
        throw new Error(
          `Failed to parse Gemini output as JSON: ${err.message}. Output (truncated): ${String(raw).slice(0, 200)}`,
        );
      }
    } catch (err) {
      // surface helpful message for axios errors
      if (err?.response?.data) {
        const info = err.response.data;
        throw new Error(
          `Gemini API error (status ${err.response.status}): ${JSON.stringify(info)}`,
        );
      }
      throw err;
    }
  };
})();
