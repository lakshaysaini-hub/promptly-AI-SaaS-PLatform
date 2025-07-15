import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "../../../lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 401 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial)
      return new NextResponse("Free Trial Has Expired", { status: 403 });

    const input = {
      prompt: prompt,
    };

    const response = await replicate.run("minimax/video-01", { input });

    await increaseApiLimit();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("[VIDEO_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
