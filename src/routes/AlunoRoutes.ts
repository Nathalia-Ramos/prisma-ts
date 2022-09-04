import {Router} from "express"

import AlunoController from "../controllers/AlunoController"

const router = Router();

router.post('/', AlunoController.create)
router.get('/', AlunoController.getAll)
router.put('/:id', AlunoController.update)
export default router