import {Router} from "express"

import CidadeController from "../controllers/CidadeController"

const router = Router();

router.post('/', CidadeController.create)
router.get('/', CidadeController.getAll)
router.get('/list',CidadeController.CidadeEstado)
router.put('/:id', CidadeController.update)


export default router