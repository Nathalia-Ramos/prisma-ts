import {Router} from "express"

import ProfessoresController from "../controllers/ProfessoresController"

const router = Router();

router.post('/', ProfessoresController.create)
router.get('/', ProfessoresController.getAll)
router.put('/:id', ProfessoresController.update)

export default router;