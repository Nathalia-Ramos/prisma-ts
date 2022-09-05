import { Request, Response } from "express";

import { Cidade } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

export default class CidadeController{
    static async create(req: Request, res: Response){
        const {nome, sigla}: Cidade = req.body
        let {idEstado}: Cidade = req.body

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
    static async getAll(req: Request, res: Response){
        const result = await prismaClient.cidade.findMany()

        try {
            return res.status(200).json({result : result})
        } catch (error: any) {
            console.error(error)
            return res.status(400).json({message: "Não foi possível listar todas as cidades"})
        }
    }

    static async update(req: Request, res: Response){
        const {id} = req.params
        const {nome, sigla, idEstado} = req.body

        await prismaClient.cidade.update({
            data: {
                nome,
                sigla,
                estado:{
                    connect: {id: idEstado}
                }
            },
            where:{
                id : Number(id)
            }
        })
        res.status(201)
        .json({message: "Cidade atualizado com sucesso!!"})   
           
    }
    static async CidadeEstado(req: Request, res: Response){
        const result = await prismaClient.cidade.findMany({
            include: {
                estado: true
            },
            
        })
        return res.status(200).json({result : result})
    }

}