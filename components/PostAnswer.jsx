"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnswerSchema } from "@/lib/Validations";
import { useState } from "react";
import FormEditor from "./Form/FormEditor";
import Image from "next/image";
import { usePathname } from "next/navigation";
import createAnswer from "@/lib/actions/answer.actions";

const PostAnswer = ({ author, question }) => {
  const [submitting, setSubmitting] = useState(false);
  let pathname = usePathname();
  const form = useForm({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function onSubmit(values) {
    try {
      setSubmitting(true);
      console.log(values.answer);

      let content = values.answer;
      createAnswer({
        content: content,
        author: JSON.parse(author),
        question: JSON.parse(question),
        path: pathname,
      });
    } catch (e) {
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <div className="text-dark400_light800 mt-8 -mb-2 flex justify-between items-center max-xs:flex-col max-xs:gap-3 ">
        <p className="paragraph-semibold  max-xs:w-full text-left">
          Write your answer here
        </p>
        <Button className="dark:dark-gradient  bg-light-750 px-5 py-5 items-center justify-center dark:border-none border-light-500/50 border-2 max-xs:w-full hover:opacity-90">
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
        className="mt-5 flex w-full flex-col gap-6 mb-10"
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
          className="primary-gradient paragraph-semibold mt-8 min-h-11 w-full max-w-28 max-xs:max-w-full self-end  transition-all duration-300  text-light-800 hover:opacity-90"
          disabled={submitting}
        >
          {submitting ? "Submitting" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default PostAnswer;
