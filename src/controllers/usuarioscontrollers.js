import {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuariosByNombre,
  getUsuariosByApellido,
  getUsuariosByRol
} from '../services/usuariosServices.js';

export const getObtenerTodosLosUsuarios = async (req, res, next) => {
  try {
    const usuarios = await getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

export const getObtenerUsuarioPorId = async (req, res, next) => {
  try {
    const usuario = await getUsuarioById(req.params.id_usuario);
    res.json(usuario);
  } catch (err) {
    next(err);
  }
};

export const postCrearUsuarios = async (req, res, next) => {
  try {
    const { rolId, nombreUsuario, clave, nombre, apellido } = req.body;
    if (!rolId || !nombreUsuario || !clave || !nombre || !apellido) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const usuario = await createUsuario(rolId, nombreUsuario, clave, nombre, apellido);
    res.status(201).json(usuario);
  } catch (err) {
    next(err);
  }
};

export const putActualizarUsuarios = async (req, res, next) => {
  try {
    const { id_usuario } = req.params;
    const { rolId, nombreUsuario, clave, nombre, apellido } = req.body;
    if (!rolId || !nombreUsuario || !clave || !nombre || !apellido) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const usuario = await updateUsuarios([rolId, nombreUsuario, clave, nombre, apellido, id_usuario]);
    res.json(usuario);
  } catch (err) {
    next(err);
  }
};

export const deleteEliminarUsuario = async (req, res, next) => {
  try {
    const usuario = await deleteUsuario(req.params.id_usuario);
    res.json(usuario);
  } catch (err) {
    next(err);
  }
};

export const getObtenerUsuariosPorNombre = async (req, res, next) => {
  try {
    const usuarios = await getUsuariosByNombre(req.params.nombre);
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

export const getObtenerUsuariosPorApellido = async (req, res, next) => {
  try {
    const usuarios = await getUsuariosByApellido(req.params.apellido);
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

export const getObtenerUsuariosPorRol = async (req, res, next) => {
  try {
    const usuarios = await getUsuariosByRol(req.params.id_rol);
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};