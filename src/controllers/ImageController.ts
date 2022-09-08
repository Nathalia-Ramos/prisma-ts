import { Request, Response, Router} from "express";
import { Imagem } from "@prisma/client";
import {multerConfig} from "../config/multer";
import { prismaClient } from "../database/prismaClient";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

export default class ImageController{
    
    
    static async create(req: Request, res: Response){
        let image = req.file

        try {
            const newImage = await prismaClient.imagem.create({
                data:{
                    image : req.path
                }
            })
            console.log(image)
            return res.status(201).json({image})
        } catch (error: any) {
            console.error(error)
            res.status(400).json({ message: "Não foi possível inserir uma imagem!" });
        }
        
   
}

}


