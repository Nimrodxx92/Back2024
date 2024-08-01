const { Router } = require("express");
const { CartManager } = require("../cartManager");

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ message: "Carrito creado con éxito", newCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cartDB = await cartManager.getCartById(Number(cid));
    if (!cartDB) {
      res.status(404).json({ message: "Carrito no encontrado" });
    }
    return res.status(200).json({
      message: `Carrito con ID ${cid} encontrado`,
      data: cartDB,
    });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const addProductId = await cartManager.addProductToCart(Number(cid, pid));
    if (!addProductId) {
      res.status(404).json({ message: "ID no encontrado" });
    }
    return res.status(200).json({
      message: `Producto con ID ${pid} agregado al carrito con ${cid}`,
      data: addProductId,
    });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
