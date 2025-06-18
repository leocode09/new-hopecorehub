
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain uppercase, lowercase, and number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const profileSchema = z.object({
  full_name: z.string().max(100, "Name too long").optional(),
  nickname: z.string().min(1, "Nickname is required").max(50, "Nickname too long"),
  phone: z.string().regex(/^[\+]?[\d\s\-\(\)]+$/, "Invalid phone number").optional().or(z.literal("")),
  location: z.string().max(100, "Location too long").optional(),
  gender: z.enum(["female", "male", "other", "prefer_not_to_say"]).optional(),
});

export const forumPostSchema = z.object({
  content: z.string()
    .min(10, "Post must be at least 10 characters")
    .max(1000, "Post must be less than 1000 characters"),
});

export const forumReplySchema = z.object({
  content: z.string()
    .min(5, "Reply must be at least 5 characters")
    .max(500, "Reply must be less than 500 characters"),
});

export const passwordResetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
