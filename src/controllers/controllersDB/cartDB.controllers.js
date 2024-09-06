const { Router } = require("express");
const { cartsModel } = require("../../DAO/models/carts.model");
const { productsModel } = require("../../DAO/models/products.model");

const router = Router();

// Ruta para obtener todos los carts de Mongo
router.get("/", async (req, res) => {
  try {
    const carts = await cartsModel.find({}, { __v: 0 }).lean();
    res.render("carts.handlebars", {
      status: "success",
      payload: carts,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "Error del servidor",
    });
  }
});

// Ruta para agregar productos al carts
router.post("/add-to-cart", async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productsModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Producto no encontrado." });
    }
    let cart = await cartsModel.findOne({});
    if (!cart) {
      cart = await cartsModel.create({ products: [] });
    }
    const existingProduct = cart.products.find((p) =>
      p.product.equals(productId)
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    const updatedCart = await cart.save();
    res.json({ status: "success", payload: updatedCart });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

// Eliminar un producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const updatedCart = await cartsModel.findByIdAndUpdate(
      cid,
      { $pull: { products: { product: pid } } },
      { new: true }
    );
    res.json({
      status: "success",
      payload: updatedCart,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

// Actualizar el carrito con un arreglo de productos
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const updatedCart = await cartsModel.findByIdAndUpdate(
      cid,
      { products },
      { new: true }
    );
    res.json({
      status: "success",
      payload: updatedCart,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

// Actualizar la cantidad de ejemplares de un producto en el carrito
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const updatedCart = await cartsModel.findOneAndUpdate(
      { _id: cid, "products._id": pid },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );
    res.json({
      status: "success",
      payload: updatedCart,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

// Eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    await cartsModel.findByIdAndDelete(cid);
    res.json({
      status: "success",
      payload: "Carrito eliminado con éxito.",
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

module.exports = router;
