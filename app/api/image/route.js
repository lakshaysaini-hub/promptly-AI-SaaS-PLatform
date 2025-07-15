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
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial)
      return new NextResponse("Free Trial Has Expired", { status: 403 });

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: resolution,
    });

    await increaseApiLimit();

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[IMAGE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
