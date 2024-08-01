const express = require("express");
const morgan = require("morgan");
const { port } = require("./configs/server.configs");
const router = require("./router/index");

const app = express();

app.use(morgan("dev"));

// Middlewares
app.use(express.json()); // Transformar JSON a objeto JS
app.use(express.urlencoded({ extended: true })); // Transformar formulario a objeto

app.get("/", (req, res) => {
  res.send("Bienvenidos a mi API");
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
