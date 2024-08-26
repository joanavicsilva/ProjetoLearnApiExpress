import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/all', async (req, res) => {
    try{
        const users = await prisma.user.findMany()

        res.json(users)
    }catch(err){
        res.status(500).send(err)
    }
})

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

export default router