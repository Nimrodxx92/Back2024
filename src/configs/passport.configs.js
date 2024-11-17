const passport = require("passport");
const local = require("passport-local");
const github = require("passport-github2");
const passportJWT = require("passport-jwt");
const usersModel = require("../DAO/models/users.model");
const { createHash, useValidPassword } = require("../utils/crypt-password");
const serverConfigs = require("../configs/server.configs");

const buscaToken = (req) => {
  const token = req && req.cookies ? req.cookies.token : null;
  return token;
};

const initPassport = () => {
  passport.use(
    "github",
    new github.Strategy(
      {
        clientID: "Iv23lidMt1hRKCGI22Tp",
        clientSecret: "daf64686d5c9e2188f5924de437791a2cb61d8e0",
        callbackURL: "http://localhost:8080/api/sessions/callbackGithub",
      },
      async (token, rt, profile, done) => {
        console.log(profile);
        try {
          let { name, email } = profile._json;
          if (!name || !email) return done(null, false);

          const nameParts = name.split(" ");
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(" ") || "Sin apellido";

          let user = await usersModel.findOne({ email });

          if (!user) {
            const newUser = {
              first_name: firstName,
              last_name: lastName,
              email,
              age: 0,
              password: createHash("defaultPassword"),
            };

            user = await usersModel.create(newUser);
          }
          return done(null, user);
        } catch (error) {
          console.error("Error en la autenticación con GitHub: ", error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "registro",
    new local.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          let { nombre } = req.body;
          if (!nombre) {
            return done(null, false, { message: `Complete el nombre` });
          }
          let existe = await usersModel.findOne({ email: username });
          if (existe) {
            return done(null, false, {
              message: `Ya existe un usuario con email ${username}`,
            });
          }

          password = generaHash(password);

          let nuevoUsuario = await usersModel.create({
            nombre,
            email: username,
            password,
          });
          return done(null, nuevoUsuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new local.Strategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          let usuario = await usersModel.findOne({ email: username });
          if (!usuario) {
            return done(null, false, { message: `credenciales invalidas` });
          }
          if (!useValidPassword(password, usuario.password)) {
            return done(null, false, { message: `credenciales invalidas` });
          }

          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new passportJWT.Strategy(
      {
        secretOrKey: serverConfigs.JWT_SECRET,
        jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([buscaToken]),
      },
      async (usuario, done) => {
        try {
          console.log("Payload recibido:", usuario);
          return done(null, usuario);
        } catch (error) {
          console.error("Error en la estrategia `current`:", error);
          return done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};

module.exports = initPassport;
