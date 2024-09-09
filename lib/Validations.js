"use client";
import { z } from "zod";

// Define the schema for the form using zod
const formSchema = z.object({
  title: z.string().min(2).max(200),
  explanation: z.string().min(20),
  tags: z
    .array(z.string().min(1).max(16))
    .min(1, { message: "Please provide at least one tag" }),
});

const AnswerSchema = z.object({
  answer: z.string().min(20),
});

export { formSchema, AnswerSchema };
