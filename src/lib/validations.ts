import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  companyName: z.string().min(2, "Company name is required"),
  phone: z.string().min(6, "Enter a valid phone number"),
});

export const rfqSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().min(10, "Add a bit more detail"),
  category: z.string().optional(),
  quantity: z.coerce.number().int().positive("Quantity must be positive"),
  unit: z.string().min(1).default("units"),
  budget: z.coerce.number().positive().optional(),
  deadline: z.coerce.date(),
});

export const quoteSchema = z.object({
  rfqId: z.string().min(1),
  unitPrice: z.coerce.number().positive("Unit price must be positive"),
  deliveryDays: z.coerce.number().int().positive("Enter delivery days"),
  notes: z.string().optional(),
  attachmentUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type RfqInput = z.infer<typeof rfqSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
