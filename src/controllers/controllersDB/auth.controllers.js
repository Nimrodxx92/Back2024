const { Router } = require("express");
const { useValidPassword } = require("../../utils/crypt-password");
const Users = require("../../DAO/models/users.model");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const validPassword = useValidPassword(user, password);
    if (!validPassword) {
      return res.status(400).json({ message: "Clave inválida" });
    }

    // Almaceno el usuario en la sesión
    req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };

    res.json({
      status: "success",
      message: "Login Successful",
      redirectTo: "/productsDB",
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.status(200).json({ message: "El logout fue exitoso" });
  });
});

module.exports = router;
