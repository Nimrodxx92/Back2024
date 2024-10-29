const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../configs/server.configs");
const router = Router();

router.get("/error", (req, res) => {
  return res.status(401).json({ error: `Error al autenticar` });
});

router.get("/github", passport.authenticate("github", {}));

router.get(
  "/callbackGithub",
  passport.authenticate("github", { failureRedirect: "/api/sessions/error" }),
  (req, res) => {
    req.session.usuario = req.user;
    return res
      .status(200)
      .json({ payload: "Login exitoso", usuarioLogueado: req.user });
  }
);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/api/sessions/error" }),
  (req, res) => {
    req.session.usuario = req.user;

    let token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: 3600 });

    return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ payload: "Login OK", usuarioLogueado: req.user });
  }
);

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ datosUsuarioLogueado: req.user });
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(400).json({ error: `Error con el logout` });
    }
    return res.status(200).json({ payload: "Logout exitoso" });
  });
});

module.exports = router;
