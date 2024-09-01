import express from "express";
import morgan from "morgan";
import cors from "cors";
import applyRoutes from "./src/routes/exports/router";

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

// todas rotas da api (servidor)
applyRoutes(app);

// para tratar errors no servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.listen(PORT, () => [console.log(`Server is running on port ${PORT}`)]);
