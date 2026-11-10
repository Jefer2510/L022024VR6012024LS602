// Importamos Router desde express para crear un conjunto de rutas
import { Router } from 'express';

// Importamos los metodos que definimos en services/comentariosServices.js
import {
  getAllComentarios,
  getComentarioById,
  createComentario,
  updateComentario,
  deleteComentario,
  getComentariosByPublicacion,
  getComentariosByUsuario
} from '../services/comentariosServices.js';

// Creamos una instancia de Router
const router = Router();

// Rutas de busqueda (van antes de /:id)
router.get('/publicacion/:publicacionId', getComentariosByPublicacion);
router.get('/usuario/:usuarioId', getComentariosByUsuario);

// CRUD
router.get('/', getAllComentarios);
router.get('/:id', getComentarioById);
router.post('/', createComentario);
router.put('/:id', updateComentario);
router.delete('/:id', deleteComentario);

// Exportamos el router para usarlo en index.js
export default router;
