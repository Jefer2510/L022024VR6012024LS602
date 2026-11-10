import { Router } from 'express';

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

const router = Router();

router.get('/nombre/:nombre', getUsuariosByNombre);
router.get('/apellido/:apellido', getUsuariosByApellido);
router.get('/rol/:rolId', getUsuariosByRol);

router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;
