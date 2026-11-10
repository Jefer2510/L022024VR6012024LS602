
import { pool } from '../db.js';

export const getAllUsuarios = async (req, res) => {
  try {
    
    const result = await pool.query('SELECT * FROM usuarios');
    
    res.json(result.rows);
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM usuarios WHERE usuarioId = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { rolId, nombreUsuario, clave, nombre, apellido } = req.body;

    if (!rolId || !nombreUsuario || !clave || !nombre || !apellido) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const result = await pool.query(
      'INSERT INTO usuarios (rolId, nombreUsuario, clave, nombre, apellido) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [rolId, nombreUsuario, clave, nombre, apellido]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { rolId, nombreUsuario, clave, nombre, apellido } = req.body;

    if (!rolId || !nombreUsuario || !clave || !nombre || !apellido) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const result = await pool.query(
      'UPDATE usuarios SET rolId = $1, nombreUsuario = $2, clave = $3, nombre = $4, apellido = $5 WHERE usuarioId = $6 RETURNING *',
      [rolId, nombreUsuario, clave, nombre, apellido, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM usuarios WHERE usuarioId = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsuariosByNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const result = await pool.query('SELECT * FROM usuarios WHERE nombre = $1', [nombre]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsuariosByApellido = async (req, res) => {
  try {
    const { apellido } = req.params;
    const result = await pool.query('SELECT * FROM usuarios WHERE apellido = $1', [apellido]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsuariosByRol = async (req, res) => {
  try {
    const { rolId } = req.params;
    const result = await pool.query('SELECT * FROM usuarios WHERE rolId = $1', [rolId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
