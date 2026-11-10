import {
  getAllComentarios,
  getComentarioById,
  createComentario,
  updateComentario,
  deleteComentario,
  getComentariosByPublicacion,
  getComentariosByUsuario
} from '../services/comentariosServices.js';

export const getObtenerTodosLosComentarios = async (req, res, next) => {
  try {
    const comentarios = await getAllComentarios();
    res.json(comentarios);
  } catch (err) {
    next(err);
  }
};

export const getObtenerComentarioPorId = async (req, res, next) => {
  try {
    const comentario = await getComentarioById(req.params.id_comentario);
    res.json(comentario);
  } catch (err) {
    next(err);
  }
};

export const postCrearComentario = async (req, res, next) => {
  try {
    const { publicacionId, comentario, usuarioId } = req.body;
    if (!publicacionId || !comentario || !usuarioId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const nuevoComentario = await createComentario(publicacionId, comentario, usuarioId);
    res.status(201).json(nuevoComentario);
  } catch (err) {
    next(err);
  }
};

export const putActualizarComentario = async (req, res, next) => {
  try {
    const { id_comentario } = req.params;
    const { publicacionId, comentario, usuarioId } = req.body;
    if (!publicacionId || !comentario || !usuarioId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const comentarioActualizado = await updateComentario([publicacionId, comentario, usuarioId, id_comentario]);
    res.json(comentarioActualizado);
  } catch (err) {
    next(err);
  }
};

export const deleteEliminarComentario = async (req, res, next) => {
  try {
    const comentario = await deleteComentario(req.params.id_comentario);
    res.json(comentario);
  } catch (err) {
    next(err);
  }
};

export const getObtenerComentariosPorPublicacion = async (req, res, next) => {
  try {
    const comentarios = await getComentariosByPublicacion(req.params.id_publicacion);
    res.json(comentarios);
  } catch (err) {
    next(err);
  }
};

export const getObtenerComentariosPorUsuario = async (req, res, next) => {
  try {
    const comentarios = await getComentariosByUsuario(req.params.id_usuario);
    res.json(comentarios);
  } catch (err) {
    next(err);
  }
};