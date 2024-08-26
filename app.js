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

//coloquem suas rotas aqui
//lembrem de utilizar o array criado
import blogRoute from './src/modules/Blog/blog.route.js'
import userRoute from './src/modules/User/user.route.js'

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.all('*', (req, res) => {
  res.status(404).send({"error": "this route does not exist"});
});

app.listen(PORT, () => [console.log(`Server is running on port ${PORT}`)]);
