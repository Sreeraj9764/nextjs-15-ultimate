"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Path, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const QuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = async () => {};

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-10 w-full"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="paragraph-regular background-light700_dark300
                     light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="mt-2.5 body-regular text-light-500">
                Be specific and imagine you're asking a question to another
                person
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed Description of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>Detail</FormControl>
              <FormDescription className="mt-2.5 body-regular text-light-500">
                Introduce your problem in as much detail as possible
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Add your tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    {...field}
                    className="paragraph-regular background-light700_dark300
                     light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                    placeholder="Add tags"
                  />
                  Tags
                </div>
              </FormControl>
              <FormDescription className="mt-2.5 body-regular text-light-500">
                Add upto 3 tags to describe your problem. Press enter after each
                tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient !text-light-900 w-fit"
          >
            Ask a Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
