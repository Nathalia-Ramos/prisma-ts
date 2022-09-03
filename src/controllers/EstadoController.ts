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
}