const { Router } = require("express");
const { isAuth, isAdmin } = require("../../middleware/auth.middleware");
const router = Router();

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/profile", isAuth, async (req, res) => {
  try {
    const { user } = req.session;

    if (user.role === "admin") {
      return res.redirect("/profileAdmin");
    }

    res.render("profile", { user });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/profileAdmin", isAuth, isAdmin, async (req, res) => {
  try {
    const { user } = req.session;
    res.render("profileAdmin.handlebars", { user });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
