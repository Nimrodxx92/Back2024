const passport = require("passport");

const isAuth = (req, res, next) => {
  passport.authenticate("current", { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(401).json({ message: "No autorizado" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "No tienes permisos para ingresar" });
  }
  next();
};

module.exports = { isAuth, isAdmin };
