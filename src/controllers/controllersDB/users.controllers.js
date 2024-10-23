const { createHash } = require("../../utils/crypt-password");
const { Router } = require("express");
const router = Router();
const Users = require("../../DAO/models/users.model");

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password, age } = req.body;

    if (!first_name || !last_name || !email || !password || !age) {
      return res.status(400).json({
        status: "error",
        message: "Todos los campos son obligatorios",
      });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "El email ya está registrado",
      });
    }

    const hashedPassword = createHash(password);
    const newUserInfo = {
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    };

    const user = await Users.create(newUserInfo);
    res.json({ status: "success", message: user });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error interno del servidor" });
  }
});

module.exports = router;
