const isAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Necesitas iniciar sesión" });
  }
  return next();
};

const isAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "No tienes permisos para ingresar" });
  }
  next();
};

module.exports = { isAuth, isAdmin };
