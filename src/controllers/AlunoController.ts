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
}