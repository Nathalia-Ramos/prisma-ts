import {Router} from "express"

import AlunoController from "../controllers/AlunoController"

const router = Router();

router.post('/', AlunoController.create)
router.get('/', AlunoController.getAll)
router.get('/list', AlunoController.AlunoEscola)
router.get('/EstadoAluno', AlunoController.EstadoAluno)
router.put('/:id', AlunoController.update)
router.delete('/:id', AlunoController.delete)



export default router