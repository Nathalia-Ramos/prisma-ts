import e, { Request, Response } from "express";
import { Multer } from "multer";
import bcrypt, { compare } from "bcrypt";
import nodemailer from "nodemailer"
import crypto from "crypto"

import { Aluno } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";




export default class AlunoController{

    //criando o aluno
    static async create(req: Request, res: Response){

        const {nome, idade, idEscola, email, senha}: Aluno = req.body
        let image = req.file?.path
              
        if(!nome || !idade || !idEscola ) res.status(400).json({message: "Existem campos obrigratórios que não foram preechados"})

        try {
            //encriptografando a senha
            const senhaHash = await bcrypt.hash(senha as string, 8);

            const newAluno = await prismaClient.aluno.create({
                data:{
                    nome,
                    idade : Number(idade),
                    image,
                    idEscola: Number(idEscola),
                    email,
                    senha: senhaHash
                }
            })
            res.status(201).json(newAluno)

        } catch (error : any) {
            console.error(error)
            res.status(400).json({ message: "Não foi possível cadastrar um aluno!" });
        }
    }
    //login
    static async Login(req: Request, res: Response){
        const {email, senha}: Aluno = req.body

        try {
            const user = await prismaClient.aluno.findFirst({
               where:{
                 email
               }  
            })

            if(await bcrypt.compare(senha as string, user?.senha as string)){
                const data = {
                    nome: user?.nome,
                    email: user?.email
                }
                return res.status(200).json(data)
            }else{
                res.status(500).json({message: "Usuário ou senhas inválida"})
            }
        } catch (error: any) {
            res.status(404).json({message: "Usuário não encontrado"})
        }
    }
    //Recuperando senha via email
    static async RecuperandoSenha(req: Request, res: Response){
        const {email}: Aluno = req.body
        

        try {

            const user = await prismaClient.aluno.findFirst({
               where:{
                  email
               }
            
            })
            const transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "b274b37dbf36eb",
                    pass: "5bdb6259c7d9b6"
                }
            })
            //criando nova senha e atualizando no bd
            const novaSenha = crypto.randomBytes(4).toString('hex')

            transporter.sendMail({
                from: 'Administrador <0a4aaf5b8b-d7590b+1@inbox.mailtrap.io>',
                to: email as string,
                subject: 'Recuperando senha',
                text: `Olá, sua nova senha é: ${novaSenha}`
            }).then(
                ()=>{
               
                  bcrypt.hash(novaSenha, 8).then(
                         senha => {
                           let id = req.params

                            prismaClient.aluno.update({
                                data:{
                                   senha 
                                },
                                where:{
                                   id: Number(id)
                                }
                            }).then(
                                () => {
                                    return res.status(200).json({message :"E-mail enviado com sucesso"})
                                }
                             )
                        }
                     )
                  

                }
            )

        } catch (error: any) {
            res.status(404).json({message: "Usuário não encontrado"})
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