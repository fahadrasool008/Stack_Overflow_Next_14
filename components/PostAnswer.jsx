"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnswerSchema } from "@/lib/Validations";
import FormEditor from "./Form/FormEditor";
import Image from "next/image";
import { usePathname } from "next/navigation";
import createAnswer from "@/lib/actions/answer.actions";

const PostAnswer = ({ author, question }) => {
  const [submitting, setSubmitting] = useState(false);
  const pathname = usePathname();
  const form = useForm({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function onSubmit(values) {
    try {
      setSubmitting(true);
      const content = values.answer;
      await createAnswer({
        content,
        author,
        question,
        path: pathname,
      });
      form.setValue("answer", "");
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <div className="text-dark400_light800 -mb-2 mt-8 flex items-center justify-between max-xs:flex-col max-xs:gap-3 ">
        <p className="paragraph-semibold  text-left max-xs:w-full">
          Write your answer here
        </p>
        <Button className="dark:dark-gradient  items-center justify-center border-2 border-light-500/50 bg-light-750 p-5 hover:opacity-90 dark:border-none max-xs:w-full">
          <Image
            src="/assets/icons/stars.svg"
            width={14}
            height={14}
            alt="stars"
            className="mr-1"
          />
          <span className="primary-text-gradient body-semibold">
            Generate AI Answer
          </span>
        </Button>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-10 mt-5 flex w-full flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
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

        <Button
          type="submit"
          className="primary-gradient paragraph-semibold mt-8 min-h-11 w-full max-w-28 self-end text-light-800  transition-all duration-300  hover:opacity-90 max-xs:max-w-full"
          disabled={submitting}
        >
          {submitting ? "Submitting" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default PostAnswer;
