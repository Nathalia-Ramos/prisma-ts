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

    static async getAll (req: Request, res: Response){
        const result = await prismaClient.professores.findMany()

        try {
            return res.status(200).json({resut : result})
        } catch (error: any) {
            console.error (error)

            res.status(400).json({message: "Não foi possível listar todos os professores!"})
        }
    }

    static async update(req: Request, res: Response){
        const {id} = req.params
        const {nome}: Professores = req.body

        await prismaClient.professores.update({
                    
            data:{
               nome 
            },
            where:{
               id : Number(id)
            },

        })
             res.status(201)
            .json({message: "Professor atualizado com sucesso!!"})   
        
    }
    static async delete(req: Request, res: Response){
        const {id} = req.params

        await prismaClient.professores.delete({
            where:{
                id: Number(id)
            }
        })
        return res.status(200).json({message: "Registro excluído com sucesso!"})
    }

}