import {Router} from "express"

import ProfessoresController from "../controllers/ProfessoresController"

const router = Router();

router.post('/', ProfessoresController.create)

export default router;