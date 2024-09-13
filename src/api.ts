// src/api.ts
import express from 'express';
import { BookSchema, PublisherSchema } from './types';
import * as db from './db';

const router = express.Router();

router.get('/books', async (req, res) => {
  try {
    const books = await db.getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar livros' });
  }
});

router.get('/books/:id', async (req, res) => {
  try {
    const book = await db.getBook(Number(req.params.id));
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar o livro' });
  }
});

router.post('/books', async (req, res) => {
  try {
    const book = BookSchema.parse(req.body);
    const newBook = await db.createBook(book);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: 'Dados de livro inválidos' });
  }
});

router.put('/books/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = BookSchema.partial().parse(req.body);
    const updatedBook = await db.updateBook(id, book);
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: 'Dados de livro inválidos' });
  }
});

router.delete('/books/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.deleteBook(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Falha ao excluir o livro' });
  }
});

router.get('/publishers', async (req, res) => {
  try {
    const publishers = await db.getPublishers();
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar editores' });
  }
});

router.post('/publishers', async (req, res) => {
  try {
    const publisher = PublisherSchema.parse(req.body);
    const newPublisher = await db.createPublisher(publisher);
    res.status(201).json(newPublisher);
  } catch (error) {
    res.status(400).json({ error: 'Dados do editor inválidos' });
  }
});

export default router;