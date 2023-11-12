import { HfInference } from "@huggingface/inference"
import { HuggingFaceStream, StreamingTextResponse, streamToResponse } from "ai"

// Create a new HuggingFace Inference instance
const Hf = new HfInference(process.env.NEXT_HUGGINGFACE_API_KEY!)

export async function POST(req: Request) {
  const { messages } = await req.json()
  console.log(messages)
  // Make API call to HuggingFace AI model using Vercel AI SDK
  // You will need to add 'NEXT_HUGGINGFACE_API_KEY' in your Vercel project's environment variables and .env.local file to use this API
  const response = Hf.textGenerationStream({
    model: "bigscience/bloom",
    inputs: messages.map((message: any) => message.content).join("\n"),
    parameters: {
      max_new_tokens: 200,
      temperature: 0.5,
      top_p: 0.95,
      top_k: 4,
      repetition_penalty: 1.03,
      truncate: 1000
    }
  })

  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
