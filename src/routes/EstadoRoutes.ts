import {Router} from "express"

import EstadoController from "../controllers/EstadoController"

const router = Router();

router.post('/', EstadoController.create)

export default router