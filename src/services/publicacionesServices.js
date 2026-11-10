import { pool } from '../db.js';

export const getAllPublicaciones = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM publicaciones');
   
    res.json(result.rows);
  } catch (err) {
   
    res.status(500).json({ error: err.message });
  }
};

export const getPublicacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM publicaciones WHERE publicacionId = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Publicacion no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, usuarioId } = req.body;

    if (!titulo || !descripcion || !usuarioId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const result = await pool.query(
      'INSERT INTO publicaciones (titulo, descripcion, usuarioId) VALUES ($1, $2, $3) RETURNING *',
      [titulo, descripcion, usuarioId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, usuarioId } = req.body;

    if (!titulo || !descripcion || !usuarioId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const result = await pool.query(
      'UPDATE publicaciones SET titulo = $1, descripcion = $2, usuarioId = $3 WHERE publicacionId = $4 RETURNING *',
      [titulo, descripcion, usuarioId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Publicacion no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM publicaciones WHERE publicacionId = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Publicacion no encontrada' });
    }
    res.json({ mensaje: 'Publicacion eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPublicacionesByUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const result = await pool.query('SELECT * FROM publicaciones WHERE usuarioId = $1', [usuarioId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTopPublicaciones = async (req, res) => {
  try {
    const { n } = req.params;
    const result = await pool.query(
      'SELECT p.publicacionId, p.titulo, COUNT(c.comentarioId) AS cantidadComentarios ' +
      'FROM publicaciones p ' +
      'INNER JOIN comentarios c ON c.publicacionId = p.publicacionId ' +
      'GROUP BY p.publicacionId, p.titulo ' +
      'ORDER BY cantidadComentarios DESC ' +
      'LIMIT $1',
      [n]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
