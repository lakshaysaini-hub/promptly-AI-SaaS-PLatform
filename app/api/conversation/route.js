import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { getAuth } from "@clerk/nextjs/server";
import { increaseApiLimit, checkApiLimit } from "../../../lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit(userId);

    if (!freeTrial)
      return new NextResponse("Free Trial Has Expired", { status: 403 });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    await increaseApiLimit(userId);

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
