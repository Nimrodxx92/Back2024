const express = require("express");
const cookieParser = require("cookie-parser");
const configs = require("./configs/server.configs");
const router = require("./router/index");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const http = require("http");
const setupSocketIo = require("./sockets");
const initPassport = require("./configs/passport.configs");
const session = require("express-session");
const mongoConnect = require("./db/index");
const MongoStore = require("connect-mongo");
const passport = require("passport");

const app = express();
const server = http.createServer(app);
const io = setupSocketIo(server);
app.locals.io = io;

// Middlewares
app.use(express.json()); // Transformar JSON a objeto JS
app.use(express.urlencoded({ extended: true })); // Transformar formulario a objeto
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(cookieParser());

// Configurar el middleware de sesión
app.use(
  session({
    secret: configs.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: configs.MONGO_URL,
      dbName: configs.DB_NAME,
      ttl: 1200,
    }),
  })
);

initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine()); // Config para handlebars
app.set("views", __dirname + "/views"); // Config la carpeta para las plantillas
app.set("view engine", "handlebars"); // Config la extension de las plantillas

app.get("/", (req, res) => {
  res.send("Bienvenidos a mi API");
});

app.use("/", router);
mongoConnect();

server.listen(configs.PORT, () => {
  console.log(`Server running at http://localhost:${configs.PORT}`);
});
