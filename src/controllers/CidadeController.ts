import { Request, Response } from "express";

import { Cidade } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

export default class CidadeController{
    static async create(req: Request, res: Response){
        const {nome, sigla, idEstado}: Cidade = req.body

        if(!nome || !sigla || !idEstado) res.status(401).json({messagem: "Existem campos obrigatórios que não foram preenchdos"})

        try {
            const newCidade = await prismaClient.cidade.create({
                data:{
                    nome, 
                    sigla,
                    estado:{
                        connect: {id: idEstado}
                    }
                }
            })
            res.status(201).json({message: "Cidade criada com sucesso!"})
        } catch (error:any) {
            console.error(error)
            res.status(400).json({message: "Não foi possível inserir regitros"})
        }
    }
}