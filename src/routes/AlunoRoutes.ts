import {Router} from "express"
import { Multer } from "multer";
import upload from "../config/multer";
import multerConfig from "../config/multer";

import AlunoController from "../controllers/AlunoController"

const router = Router();

router.post('/', upload.single('image'), AlunoController.create)
router.post('/login', AlunoController.Login)
router.post('/RecuperandoSenha', AlunoController.RecuperandoSenha)

router.get('/', AlunoController.getAll)
router.get('/list', AlunoController.AlunoEscola)
router.get('/EstadoAluno', AlunoController.EstadoAluno)

router.put('/:id', AlunoController.update)
//router.put('/editandoSenha/:id', AlunoController.updateSenha)
router.delete('/:id', AlunoController.delete)

export default router
