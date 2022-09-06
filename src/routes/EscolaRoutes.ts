import {Router} from "express"

import EscolaController from "../controllers/EscolaController"

const router = Router();

router.post('/', EscolaController.create)
router.get('/', EscolaController.getAll)
router.put('/:id', EscolaController.update)
router.delete('/:id', EscolaController.delete)

export default router