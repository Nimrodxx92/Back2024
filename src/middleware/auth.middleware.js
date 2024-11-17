const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user?.role === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Acceso denegado. Requiere rol de administrador." });
};

const isUser = (req, res, next) => {
  const user = req.user;
  if (user?.role === "user") {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Acceso denegado. Requiere rol de usuario." });
};

const isAuth = (req, res, next) => {
  if (!req.isAuthenticated || !req.user) {
    return res.status(403).json({ error: "Usuario no autenticado" });
  }
  console.log("Usuario autenticado:", req.user);
  next();
};

module.exports = { isAdmin, isUser, isAuth };
