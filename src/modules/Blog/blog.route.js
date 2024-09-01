import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//todos os blogs
router.get("/all", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        category: true,
      },
    });

    res.json(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
});
//blogs por categoria
router.get("/search/", async (req, res) => {
  try {
    const { search } = req.query;

    const blogs = await prisma.blog.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            content: {
              contains: search,
            },
          },
          {
            subTitle: {
              contains: search,
            },
          },
        ],
      },
    });

    res.json(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// >>>>>>>>>>>>>>>>>>>>>>>
//ROTAS RAPHAEL
//criação de blog
router.post("/", async (req, res) => {
  try {
    const { title, content, description, subTitle } = req.body;
    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        description,
        subTitle,
      },
    });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Rota para obter um blog específico
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await prisma.blog.findUnique({ where: { id: Number(id) } });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Rota para atualizar um blog
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, description, subTitle } = req.body;
    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data: { title, content, description, subTitle },
    });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Rota para deletar um blog
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blog.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id");

export default router;
