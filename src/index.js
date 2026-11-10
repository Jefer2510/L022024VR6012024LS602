import express from 'express';

import usuariosRouter from './routes/usuarios.js';
import publicacionesRouter from './routes/publicaciones.js';
import comentariosRouter from './routes/comentarios.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo UNICAES! El servidor está funcionando correctamente.');
});

app.use('/usuarios', usuariosRouter);
app.use('/publicaciones', publicacionesRouter);
app.use('/comentarios', comentariosRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});
