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

    
    static async AlunoEscola (req: Request, res: Response) {
        const result = await prismaClient.aluno.findMany({
            include: {
                escola : true,

            }
            
        })
        return res.status(200).json({result : result})
        
      }


      static async update(req: Request, res: Response){
        const {id} = req.params
        const {nome, idade, idEscola} = req.body

        await prismaClient.aluno.update({
            data:{
                nome,
                idade,
                escola: {
                    connect: {id: idEscola}
                }
            },
            where:{
                id : Number(id)
            }
        })
        res.status(200)
        .json({message: "Registro atualizado com sucesso!!"})   
           
    }

    
    static async EstadoAluno(req: Request, res: Response){
        const result = await prismaClient
        .$queryRaw      `SELECT 
                            n.id,
                            n.nome,
                            n.idade,
                            n.idEscola,
                            e.nome AS Estado,
                            e.sigla
                        FROM
                            tbl_aluno n
                        LEFT JOIN 
                            tbl_estado e
                        ON
                            n.id = e.id; `

        return res.status(200).json({res : result})
    }
    static async delete(req: Request, res: Response){
        const {id} = req.params

        await prismaClient.aluno.delete({
            where:{
                id: Number(id)
            }
        })
        return res.status(200).json({message: "Registro excluído com sucesso!"})
    }
}