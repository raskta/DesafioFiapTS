// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import api from './api';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', api);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});