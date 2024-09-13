// src/types.ts
import { z } from 'zod';

export const BookSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  author: z.string(),
  isbn: z.string(),
  publication_year: z.number(),
  publisher_id: z.number().optional(),
});

export const PublisherSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
});

export type Book = z.infer<typeof BookSchema>;
export type Publisher = z.infer<typeof PublisherSchema>;