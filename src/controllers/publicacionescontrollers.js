import {
  getAllPublicaciones,
  getPublicacionById,
  createPublicacion,
  updatePublicacion,
  deletePublicacion,
  getPublicacionesByUsuario,
  getTopPublicaciones
} from '../services/publicacionesServices.js';

export const getObtenerTodasLasPublicaciones = async (req, res, next) => {
  try {
    const publicaciones = await getAllPublicaciones();
    res.json(publicaciones);
  } catch (err) {
    next(err);
  }
};

export const getObtenerPublicacionPorId = async (req, res, next) => {
  try {
    const publicacion = await getPublicacionById(req.params.id_publicacion);
    res.json(publicacion);
  } catch (err) {
    next(err);
  }
};

export const postCrearPublicacion = async (req, res, next) => {
  try {
    const { titulo, descripcion, usuarioId } = req.body;
    if (!titulo || !descripcion || !usuarioId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const publicacion = await createPublicacion(titulo, descripcion, usuarioId);
    res.status(201).json(publicacion);
  } catch (err) {
    next(err);
  }
};

export const putActualizarPublicacion = async (req, res, next) => {
  try {
    const { id_publicacion } = req.params;
    const { titulo, descripcion, usuarioId } = req.body;
    if (!titulo || !descripcion || !usuarioId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const publicacion = await updatePublicacion([titulo, descripcion, usuarioId, id_publicacion]);
    res.json(publicacion);
  } catch (err) {
    next(err);
  }
};

export const deleteEliminarPublicacion = async (req, res, next) => {
  try {
    const publicacion = await deletePublicacion(req.params.id_publicacion);
    res.json(publicacion);
  } catch (err) {
    next(err);
  }
};

export const getObtenerPublicacionesPorUsuario = async (req, res, next) => {
  try {
    const publicaciones = await getPublicacionesByUsuario(req.params.id_usuario);
    res.json(publicaciones);
  } catch (err) {
    next(err);
  }
};

export const getObtenerTopPublicaciones = async (req, res, next) => {
  try {
    const publicaciones = await getTopPublicaciones(req.params.n);
    res.json(publicaciones);
  } catch (err) {
    next(err);
  }
};