// src/lib/validations/newsSchema.ts
import { z } from "zod"

export const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  author: z.string().min(1, "Author is required"),
  status: z.enum(["Draft", "Published", "Scheduled"]).default("Draft"),
  tags: z.array(z.string()).default([]),
  likes: z.array(z.string()).default([]),
  views: z.number().int().nonnegative().default(0),
  scheduledFor: z.string().datetime().nullable().optional(),
})
