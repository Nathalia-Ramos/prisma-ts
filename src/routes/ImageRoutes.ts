import {Router, Request, Response} from "express"
import {multerConfig} from "../config/multer";
import multer from "multer";

import ImageController from "../controllers/ImageController"

const router = Router();

router.post('/', multer(multerConfig).single('image'), ImageController.create)



export default router