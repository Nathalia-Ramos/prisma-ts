import { Request, Response } from "express";

import { Estado } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

export default class EstadoController{
    static async create(req: Request, res: Response){
        const {nome, sigla} : Estado = req.body

        if(!nome || !sigla) res.status(401).json({message: "Existem campos obrigatórios que não foram preenchidos"})
        try {
            const newEstado = await prismaClient.estado.create({
                data:{
                    nome,
                    sigla
                }
            })
            res.status(201).json({message: "Estado criado com sucesso!!"})
        } catch (error: any) {
            console.error(error)
            res.status(400).json({message: "Não foi possível cadastrar registro!"})
        }
    }

    static async getAll(req: Request, res: Response){
        const result = await prismaClient.estado.findMany()

        try {
            return res.status(200).json({result : result})
        } catch (error: any) {
            console.error(error)

            res.send(400).json({message: "Não foi possível listar todos os Estados"})
        }
    }
    static async update (req: Request, res: Response){
        const {id} = req.params
        const{nome, sigla} = req.body

        await prismaClient.estado.update({
            data:{
                nome, 
                sigla
            },
            where:{
                id: Number(id)
            }
            
        })
        res.status(200).json({message: "Registro atualizado com sucesso!"})
    }
}