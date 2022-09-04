import { Request, Response } from "express";

import { Aluno } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

export default class AlunoController{

    //criando o aluno
    static async create(req: Request, res: Response){

        const {nome, idade, idEscola}: Aluno = req.body
        
        if(!nome || !idade || !idEscola) res.status(400).json({message: "Existem campos obrigratórios que não foram preechados"})
       
        try {
            const newAluno = await prismaClient.aluno.create({
                data:{
                    nome,
                    idade,
                    escola: {
                        connect: {id: idEscola}
                    }
                }
            })

            res.status(201).json({message: "Aluno criado com sucesso"})
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: "Não foi possível cadastrar um aluno!" });
        }
    }

    //Listando
   static async getAll(req:Request, res: Response){
        const result = await prismaClient.aluno.findMany()
    
        try {
            return res.status(200).json({result: result})
        } catch (error:any) {
            console.error(error)
            res.status(400).json({message: "Não foi possível listar todos os alunos"})
        }
        
    }

    static async update (req: Request, res: Response){
        const {id} = req.params
        const {nome, idade, idEscola}: Aluno = req.body

            await prismaClient.professores.update({
                    
                data:{
                    nome,
                    idade : Number(idade),
                    escola: {
                        connect: {id: idEscola}
                    }
                },
                where:{
                    id : Number(id)
                },

                })
                res.status(201)
                .json({message: "Aluno atualizado com sucesso!!"})   
        
    }
}