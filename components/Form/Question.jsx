"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "../../lib/Validations";
import FormEditor from "./FormEditor";
import { Badge } from "../ui/Badge";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form";
import { PostQuestion } from "../../lib/actions/Server.Actions";
import { useRouter, usePathname } from "next/navigation";

const Question = ({ clerkId }) => {
  const [submitting, setSubmitting] = useState(false);
  const questionMode = "ask";
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  async function onSubmit(values) {
    try {
      setSubmitting(true);
      await PostQuestion({
        title: values.title,
        explanation: values.explanation,
        tags: values.tags,
        author: JSON.parse(clerkId),
        path: pathname,
      });
      router.push("/");
    } catch (e) {
    } finally {
      setSubmitting(false);
    }
  }

  function onKeyDown(e, field) {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const inputTag = e.target;
      const inputVal = inputTag.value.trim();
      if (inputVal !== "") {
        if (inputVal.length > 15) {
          form.setError("tags", {
            type: "required",
            message: "Tags must be less than 15 characters",
          });
          return;
        }
        if (field.value.length > 4) {
          form.setError("tags", {
            type: "required",
            message: "Please limit your tags to 5",
          });
          return;
        }
        if (field.value.includes(inputVal)) {
          form.setError("tags", {
            type: "required",
            message: "Tags already exists",
          });
          return;
        }
        form.setValue("tags", [...field.value, inputVal]);
        inputTag.value = "";
        form.clearErrors("tags");
      } else {
        form.trigger();
      }
    }
  }
  function onCloseDown(tag, field) {
    const newTags = field.value.filter((prevTag) => prevTag !== tag);
    form.setValue("tags", newTags);
    form.clearErrors("tags");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 flex w-full flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title{" "}
                <span className="text-lg text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 text-dark200_light800"
                  {...field}
                />
              </FormControl>
              <FormDescription className="small-regular text-light-400">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem?{" "}
                <span className="text-lg text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <FormEditor field={field} />
              </FormControl>
              <FormDescription className="small-regular text-light-400">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-lg text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    onKeyDown={(e) => onKeyDown(e, field)}
                    className="no-focus paragraph-regular background-light700_dark300 text-dark200_light800"
                  />
                  {field.value.length > 0 && (
                    <div className="flex w-full flex-wrap gap-2">
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          className="text-light400_light500 background-light750_darkgradient paragraph-regular flex items-center justify-between gap-4 rounded-md px-3 py-2 capitalize"
                        >
                          {tag}
                          <Image
                            src="/assets/icons/close.svg"
                            alt="close-btn"
                            width={12}
                            height={12}
                            onClick={(e) => onCloseDown(tag, field)}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="small-regular text-light-400">
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient paragraph-semibold mt-8 min-h-11 w-full max-w-44 self-end text-light-800 "
          disabled={submitting}
        >
          {submitting
            ? questionMode === "ask"
              ? "Posting..."
              : "Editing..."
            : questionMode === "ask"
              ? "Ask a Question"
              : "Edit Question"}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
