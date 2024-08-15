const express = require("express");
const { port } = require("./configs/server.configs");
const router = require("./router/index");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const http = require("http");
const setupSocketIo = require("./sockets");

const app = express();
const server = http.createServer(app);
const io = setupSocketIo(server);
app.locals.io = io;

// Middlewares
app.use(express.json()); // Transformar JSON a objeto JS
app.use(express.urlencoded({ extended: true })); // Transformar formulario a objeto
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

app.engine("handlebars", handlebars.engine()); // Config para handlebars
app.set("views", __dirname + "/views"); // Config la carpeta para las plantillas
app.set("view engine", "handlebars"); // Config la extension de las plantillas

app.get("/", (req, res) => {
  res.send("Bienvenidos a mi API");
});

app.use("/", router);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
