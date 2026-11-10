
import { Router } from 'express';

// Importamos los metodos que definimos en services/publicacionesServices.js
import {
  getAllPublicaciones,
  getPublicacionById,
  createPublicacion,
  updatePublicacion,
  deletePublicacion,
  getPublicacionesByUsuario,
  getTopPublicaciones
} from '../services/publicacionesServices.js';

// Creamos una instancia de Router
const router = Router();

// Rutas de busqueda (van antes de /:id)
router.get('/usuario/:usuarioId', getPublicacionesByUsuario);
router.get('/top/:n', getTopPublicaciones);

// CRUD
router.get('/', getAllPublicaciones);
router.get('/:id', getPublicacionById);
router.post('/', createPublicacion);
router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);

// Exportamos el router para usarlo en index.js
export default router;
