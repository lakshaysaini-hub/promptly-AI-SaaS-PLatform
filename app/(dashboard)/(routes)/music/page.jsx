"use client";

import axios from "axios";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import Heading from "../../../../components/Heading";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../../lib/utils";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Empty } from "../../../../components/Empty";
import { Loader } from "../../../../components/Loader";

import { UserAvatar } from "../../../../components/userAvatar";
import { BotAvatar } from "../../../../components/botAvatar";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ConversationPage = () => {
  const [messages, setMessages] = useState([]);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  // shows the state of form being submitted
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      const userMessage = {
        role: "User",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error) {
      // TODO:Open Pro Model
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none
                        focus-visible:ring-0  
                        focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of the circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {/* ----------Loading---------- */}
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {/* ----------Empty---------- */}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          {/* ----------RENDERING MESSAGES---------- */}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
