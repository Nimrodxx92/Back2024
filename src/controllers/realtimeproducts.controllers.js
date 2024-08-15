const express = require("express");
const router = express.Router();
const { ProductManager } = require("../productManager");

const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const productsDB = await productManager.getProducts(limit);
    return res
      .status(200)
      .render("realtimeproducts.handlebars", { products: productsDB });
  } catch (error) {
    console.error("Error en la obtención de productos:", error);
    return res.status(500).json({
      error: "Error del servidor",
    });
  }
});

router.post("/add", async (req, res) => {
  const { body } = req;
  const io = req.app.locals.io;
  try {
    const newProduct = await productManager.addProduct(body);
    if (!io) {
      console.error("Socket.io no se ha iniciado");
    } else {
      io.emit("productUpdated", newProduct);
    }
    return res.status(200).json(newProduct);
  } catch (error) {
    console.error("Error al agregar producto:", error);
    return res.status(500).json({
      error: "Error del servidor",
    });
  }
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;
  const io = req.app.locals.io;
  try {
    const success = await productManager.deleteProduct(id);
    if (!success) {
      console.error(`Producto con ID ${id} no encontrado.`);
      return res.status(404).send("Producto no encontrado");
    }
    if (!io) {
      console.error("Socket.io no se ha iniciado");
      return res.status(500).send("Socket.io no está disponible");
    }
    io.emit("productUpdated", { id, deleted: true });
    return res.status(200).send("Producto eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return res.status(500).json({
      error: "Error del servidor",
    });
  }
});

module.exports = router;
