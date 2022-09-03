import { Request, Response } from "express";

import { Escola } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";


export default class EscolaController{
    static async create(req: Request, res: Response){
        const {nome}: Escola = req.body

        try {
            const newEscola = await prismaClient.escola.create({
                data: {
                    nome
                }
            })
            res.status(201).json({message: "Escola criada com sucesso"})

        } catch (error: any) {
            console.error(error)
            res.status(400).json({message: "Não foi possível cadastrar a escola"})
        }
    }
}