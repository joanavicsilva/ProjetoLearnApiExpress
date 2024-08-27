import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync("src/db/seed.json", "utf-8"));

  // Criar usuários
  for (const user of data.users) {
    await prisma.user.create({
      data: user,
    });
  }

  // Criar categorias
  for (const category of data.categories) {
    await prisma.category.create({
      data: category,
    });
  }

  // Criar blogs
  for (const blog of data.blogs) {
    await prisma.blog.create({
      data: blog,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
