import { Request, Response } from "express";

import { Professores } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

export default class ProfessoresController {
    static async create(req: Request, res: Response){
        const {nome}: Professores = req.body

        if(!nome) res.status(401).json({message:"O nome é obrigatório"})
        
        try {
            const newProfessores = await prismaClient.professores.create({
                data:{
                    nome
                }
            })
            res.status(201).json({message: "Professor criado com sucesso!!"})

        } catch (error: any) {
            console.error(error)
            res.status(400).json({message:"Não foi possível cadastrar o(a) professor"})
        }
    }


}