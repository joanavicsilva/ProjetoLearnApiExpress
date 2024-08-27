import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Aqui farei as importações das rotas de cada módulo
// o padrão de nome sempre é o nome do módulo + Route
import blogRoute from './src/modules/Blog/blog.route.js'
import userRoute from './src/modules/User/user.route.js'

// Abaixo fica a declaração de uso de cada rota
app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.all('*', (req, res) => {
  res.status(404).send({"error": "this route does not exist"});
});

// para tratar errors no servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.listen(PORT, () => [console.log(`Server is running on port ${PORT}`)]);
