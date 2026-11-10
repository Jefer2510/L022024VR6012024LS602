import { pool } from '../db.js';

export const getAllComentarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comentarios');
    
    res.json(result.rows);
  } catch (err) {
   
    res.status(500).json({ error: err.message });
  }
};

export const getComentarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM comentarios WHERE comentarioId = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createComentario = async (req, res) => {
  try {
    const { publicacionId, comentario, usuarioId } = req.body;

    if (!publicacionId || !comentario || !usuarioId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const result = await pool.query(
      'INSERT INTO comentarios (publicacionId, comentario, usuarioId) VALUES ($1, $2, $3) RETURNING *',
      [publicacionId, comentario, usuarioId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { publicacionId, comentario, usuarioId } = req.body;

    if (!publicacionId || !comentario || !usuarioId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const result = await pool.query(
      'UPDATE comentarios SET publicacionId = $1, comentario = $2, usuarioId = $3 WHERE comentarioId = $4 RETURNING *',
      [publicacionId, comentario, usuarioId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM comentarios WHERE comentarioId = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }
    res.json({ mensaje: 'Comentario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getComentariosByPublicacion = async (req, res) => {
  try {
    const { publicacionId } = req.params;
    const result = await pool.query('SELECT * FROM comentarios WHERE publicacionId = $1', [publicacionId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getComentariosByUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const result = await pool.query('SELECT * FROM comentarios WHERE usuarioId = $1', [usuarioId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
