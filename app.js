import express from "express";
import morgan from "morgan";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

//nosso array de blogs
//voces podem chama apenas blogs e utilizá-lo como blogs.push() ou blogs.map()
import { blogs } from "./data/blogs.js";

//vou utilizar um exemplo com users para voces entenderem
import { users } from "./data/users.js";

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

//coloquem suas rotas aqui
//lembrem de utilizar o array criado

//========================================================================================
// UTILIZEM ESSA PARTE COMO OREINTAÇÃO
//========================================================================================
//rotas de usuario que criei para orientação
app.get("/users", (req, res) => {
  //para exibi-los basta utilizar o .json
  //res normalmente retornam com status 200, não é preciso especificar
  res.json(users);
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  //find é uma função que retorna o primeiro elemento que encontrar
  //se não encontrar, retorna undefined
  const user = users.find((user) => user.id === id);
  //se o usuário não existir, retornamos um status 404
  if (!user) {
    return res.status(404).json({ message: "usuario não existe" });
  }
  res.json(user);
});

app.post("/user", (req, res) => {
  const { name, email, password } = req.body;
  //criamos um novo usuário
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  //adicionamos ao array
  users.push(newUser);
  //retornamos o novo usuário
  res.status(201).json(newUser);
});

app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  //encontramos o usuário
  const user = users.find((user) => user.id === id);
  //se não existir, retornamos um status 404
  if (!user) {
    return res.status(404).json({ message: "usuario não existe" });
  }
  //atualizamos os dados
  user.name = name;
  user.email = email;
  //retornamos o usuário atualizado
  res.json(user);
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  //encontramos o usuário
  const userIndex = users.findIndex((user) => user.id === id);
  //se não existir, retornamos um status 404
  if (userIndex === -1) {
    return res.status(404).json({ message: "usuario não existe" });
  }
  //removemos o usuário
  users.splice(userIndex, 1);
  //retornamos uma mensagem de sucesso
  res.json({ message: "usuario removido com sucesso" });
});

app.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  //encontramos o usuário
  const user = users.find(
    (user) => user.email === email
  );
  //se não existir, retornamos um status 404
  if (!user) {
    return res.status(404).json({ message: "usuario não existe" });
  }

  if(user.password !== password){
    return res.status(401).json({ message: "senha incorreta" });
  }

  res.json(user);
});

app.listen(PORT, () => [console.log(`Server is running on port ${PORT}`)]);
