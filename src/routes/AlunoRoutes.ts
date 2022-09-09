import {Router} from "express"
import { Multer } from "multer";
import upload from "../config/multer";
import multerConfig from "../config/multer";

import AlunoController from "../controllers/AlunoController"

const router = Router();

router.post('/', upload.array('image', 5), AlunoController.create)
router.get('/', AlunoController.getAll)
router.get('/list', AlunoController.AlunoEscola)
router.get('/EstadoAluno', AlunoController.EstadoAluno)
router.put('/:id', AlunoController.update)
router.delete('/:id', AlunoController.delete)



export default router