const { Router } = require("express");
const { useValidPassword } = require("../../utils/crypt-password");
const jwt = require("jsonwebtoken");
const Users = require("../../DAO/models/users.model");
const { JWT_SECRET } = require("../../configs/server.configs");
const router = Router();

const secretKey = JWT_SECRET;

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const validPassword = useValidPassword(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Clave inválida" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    console.log("Token generado:", token);

    res.json({
      status: "success",
      token: "Bearer " + token,
      redirectTo: "/productsDB",
    });
  } catch (error) {
    console.error("Error en el login:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
