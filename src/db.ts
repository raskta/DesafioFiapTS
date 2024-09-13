// src/db.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Book, Publisher } from './types';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function getBooks(): Promise<Book[]> {
  const { data, error } = await supabase.from('books').select('*');
  if (error) throw error;
  return data;
}

export async function getBook(id: number): Promise<Book | null> {
  const { data, error } = await supabase.from('books').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function createBook(book: Book): Promise<Book> {
  const { data, error } = await supabase.from('books').insert(book).select().single();
  if (error) throw error;
  return data;
}

export async function updateBook(id: number, book: Partial<Book>): Promise<Book> {
  const { data, error } = await supabase.from('books').update(book).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBook(id: number): Promise<void> {
  const { error } = await supabase.from('books').delete().eq('id', id);
  if (error) throw error;
}

export async function getPublishers(): Promise<Publisher[]> {
  const { data, error } = await supabase.from('publishers').select('*');
  if (error) throw error;
  return data;
}

export async function createPublisher(publisher: Publisher): Promise<Publisher> {
  const { data, error } = await supabase.from('publishers').insert(publisher).select().single();
  if (error) throw error;
  return data;
}