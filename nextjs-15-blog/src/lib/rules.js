import { title } from "process";
import z from "zod";

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z
      .string()
      .min(1, { message: "Password can't be left empty" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((value, context) => {
    if (value.password !== value.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password fields do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
});

export const BlogPostSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title can't be left empty" })
    .max(100, { message: "Title can't be more than 100 characters" })
    .trim(),

  content: z
    .string()
    .min(1, { message: "Post content can't be left empty" })
    .trim(),
});
