const { Router } = require("express");
const { ProductManager } = require("../productManager");

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const productsDB = await productManager.getProducts(limit);
    return res.status(200).json({
      message: "Productos cargados correctamente",
      data: productsDB,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productDB = await productManager.getProductById(Number(pid));
    if (!productDB) {
      return res.status(404).json({
        error: `El producto con ID ${pid} no existe`,
      });
    }
    return res.status(200).json({
      message: `Producto con ID ${pid} encontrado`,
      data: productDB,
    });
  } catch (error) {
    res.status(500).send({
      error: "Error al obtener un producto por ID desde el servidor",
    });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const addData = await productManager.addProduct(body);
    return res.status(201).json({
      message: "Producto agregado correctamente",
      data: addData,
    });
  } catch (error) {
    console.error("Error al cargar productos:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const { body } = req;
  try {
    const productUpdate = await productManager.updateProduct(pid, body);
    if (!productUpdate) {
      return res.status(404).json({
        error: `Producto con ID ${pid} no encontrado`,
      });
    }
    return res.status(200).json({
      message: `Producto con ID ${pid} actualizado`,
      data: productUpdate,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor al actualizar el producto." });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productDelete = await productManager.deleteProduct(pid);
    if (!productDelete) {
      return res.status(404).json({
        error: `Producto con ID ${pid} no encontrado`,
      });
    }
    return res.status(200).json({
      message: `Producto con ID ${pid} borrado`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor al eliminar el producto." });
  }
});

module.exports = router;
