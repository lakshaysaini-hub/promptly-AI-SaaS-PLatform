"use client";

import axios from "axios";
import * as z from "zod";
import Image from "next/image";
import { ImageIcon, DownloadIcon } from "lucide-react";
import Heading from "../../../../components/Heading";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../../lib/utils";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../../components/ui/select";
import { Button } from "../../../../components/ui/button";
import { Card, CardFooter } from "../../../../components/ui/card";
import { Empty } from "../../../../components/Empty";
import { Loader } from "../../../../components/Loader";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ImagePage = () => {
  const router = useRouter();

  const [images, setImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  // shows the state of form being submitted
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      setImages([]);

      const response = await axios.post("/api/image", values);

      // getting urls from response
      const urls = response.data.map((image) => image.url);

      setImages(urls);

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
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="pl-2 border-0 outline-none
                        focus-visible:ring-0  
                        focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A picture of a horse in Swiss alps."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Form for amount of images */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => {
                  return (
                    <FormItem className="col-span-12 lg:col-span-2">
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {amountOptions.map((options) => (
                            <SelectItem
                              key={options.value}
                              value={options.value}
                            >
                              {options.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  );
                }}
              />
              {/* Resolution form */}
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => {
                  return (
                    <FormItem className="col-span-12 lg:col-span-2">
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {resolutionOptions.map((options) => (
                            <SelectItem
                              key={options.value}
                              value={options.value}
                            >
                              {options.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  );
                }}
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
            <div className="p-20">
              <Loader />
            </div>
          )}

          {/* ----------Empty---------- */}
          {images.length === 0 && !isLoading && (
            <Empty label="No images generated." />
          )}
          {/* ----------RENDERING IMAGES---------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((image) => (
              <Card key={image} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image alt="Image" fill src={image} />
                </div>
                <CardFooter>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => window.open(image)}
                  >
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
