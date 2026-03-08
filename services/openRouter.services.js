// import axios from "axios";

// export const askAi = async ( messages, maxTokens = 250, retries = 2) => {

//     try {
//         if (!messages || !Array.isArray(messages) || messages.length === 0) {
//             throw new Error("Messages array is empty.")
//         }
//         const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
//             model:"qwen/qwen3-4b:free",
//             messages: messages,
//             max_tokens: maxTokens,
//             temperature: 0.3
//         },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         )
//         const content = response?.data?.choices?.[0]?.message?.content;

//         if (!content || !content.trim()) {
//             throw new Error("AI returned empty response.")
//         }

//         return content
//     } catch (error) {
//         const errData = error.response?.data;
//     const errCode = errData?.error?.code;

//     // ✅ Retry on rate limit
//     if (errCode === 429 && retries > 0) {
//       const delay = (3 - retries) * 1500;
//       console.log(`Rate limited. Retrying in ${delay}ms`);
//       await new Promise(res => setTimeout(res, delay));
//       return askAi(messages, maxTokens, retries - 1);
//     }

//     // ✅ Credits finished
//     if (errCode === 402) {
//       throw new Error("AI_CREDITS_EXHAUSTED");
//     }

//     console.log("OpenRouter Error:", errData || error.message);
//     throw new Error("AI_REQUEST_FAILED");
//     }
// }
import axios from "axios";

export const askAi = async (
  messages,
  maxTokens = 300,
  retries = 2
) => {
  try {

    if (!messages?.length) {
      throw new Error("Messages array is empty");
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.2,
        max_completion_tokens: maxTokens,
        stream: false
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 20000
      }
    );

    const content =
      response?.data?.choices?.[0]?.message?.content;

    if (!content?.trim()) {
      throw new Error("Empty AI response");
    }

    return content;

  } catch (error) {

    const status = error.response?.status;

    // ✅ retry on temporary failure
    if ((status === 429 || status === 503) && retries > 0) {
      console.log("Groq busy. Retrying...");
      await new Promise(r => setTimeout(r, 1500));
      return askAi(messages, maxTokens, retries - 1);
    }

    console.log("Groq Error:", error.response?.data || error.message);
    throw new Error("AI_REQUEST_FAILED");
  }
};