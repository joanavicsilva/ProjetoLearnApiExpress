import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get('', (req, res) => {
    res.send('category route')
})

//rota para criar uma categoria

//rota para deletar uma categoria

//rota para listar todas as categorias

//rota listar todos os blogs de uma categoria

export default router;