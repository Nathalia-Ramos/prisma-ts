import {Router} from "express"

import EstadoController from "../controllers/EstadoController"

const router = Router();

router.post('/', EstadoController.create)
router.get('/', EstadoController.getAll)
router.put('/:id', EstadoController.update)
router.delete('/:id', EstadoController.delete)

export default router