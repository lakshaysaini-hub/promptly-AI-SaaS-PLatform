"use client";
import { cn } from "../../../../lib/utils";

import {
  ArrowRight,
  MessageSquare,
  ImagesIcon,
  VideoIcon,
  Music2Icon,
  Code2Icon,
} from "lucide-react";
import { Card } from "../../../../components/ui/card";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-white-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: ImagesIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Music Generation",
    icon: Music2Icon,
    href: "/music",
    color: "text-emrald-500",
    bgColor: "bg-emrald-500/10",
  },
  {
    label: "Code Generation",
    icon: Code2Icon,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI.
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with smartest AI-Experience the pwer of AI.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4 ">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className=" p-4 border-black/8 flex flex-col hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
              <ArrowRight className="w-5 h-5 " />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
