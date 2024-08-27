import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

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

router.get("/:id");

router.post("");

router.delete("/:id");

export default router;
