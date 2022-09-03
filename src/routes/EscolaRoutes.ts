import {Router} from "express"

import EscolaController from "../controllers/EscolaController"

const router = Router();

router.post('/', EscolaController.create)

export default router