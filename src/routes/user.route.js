import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

//rota para listar todos os usuários
router.get('/all', async (req, res) => {
    try{
        const users = await prisma.user.findMany()

        res.json(users)
    }catch(err){
        res.status(500).send(err)
    }
})

//rota para criar um usuário
router.post('', async (req,res) => {
    try{
        const data = req.body

        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                course: data?.course,
            }
        })

        res.json(user)
    }catch (err){
        res.status(500).send(err)
    }
})

//rota para atualizar um usuário pelo id
router.put('/:id', async (req, res) => {
    try{
        const data = req.body
        const {id} = req.params

        const user = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                course: data?.course,
            }
        })

        res.json(user)
    }catch(err){
        res.status(500).send(err)
    }
})

//rota para apagar um usuário
router.delete('', async (req,res) => {
    try{
        const data = req.body
        const {id} = req.params

        const user = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.json(user)
    }catch(err){
        res.status(500).send(err)
    }
})

//rota para buscar um usuário pelo id
router.get('/:id', async (req,res) => {
    try{
        const data = req.body
        const {id} = req.params

        const user = await prisma.user.find({
            where: {
                id: parseInt(id)
            }
        })

        res.json(user)
    }catch(err){
        res.status(500).send(err)
    }
})

//rota para buscar um usuário pelo nome
router.get('/:name', async (req,res) => {
    try{
        const data = req.body
        const {name} = req.params

        const user = await prisma.name.findMany({
            where: {
                name: {contains: name}
            }
        })

        res.json(user)
    }catch(err){
        res.status(500).send(err)
    }
})

export default router