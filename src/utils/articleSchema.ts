import { z } from 'zod';

export const FrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format YYYY-MM-DD requis"),
  slug: z.string().min(1, "slug is required").regex(
    /^[a-zA-Z0-9-]+$/,
    "slug must be alphanumeric with dashes"
  ).optional(),

  // Optional fields
  description: z.string().default(""),
  featured: z.boolean().default(false),
  author: z.string().default("anonymous"),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  image: z.string().optional(),
  readingTime: z.number().optional()
});

export type ArticleFrontmatter = z.infer<typeof FrontmatterSchema>;
