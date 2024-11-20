const { Router } = require("express");
const Ticket = require("../../DAO/TicketDAO");
const router = Router();
const ticketDAO = new Ticket();

// Finalizar la compra del carrito
router.post("/:cid/purchase", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsModel.findById(cid);
  try {
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Carrito no encontrado.",
      });
    }

    // Variables para procesar la compra
    let totalAmount = 0;
    const unavailableProducts = [];

    // Procesar productos del carrito
    for (const cartItem of cart.products) {
      const product = cartItem.product;

      if (product.stock >= cartItem.quantity) {
        // Reducir stock del producto
        product.stock -= cartItem.quantity;
        await productsModel.findByIdAndUpdate(product._id, {
          stock: product.stock,
        });
        totalAmount += product.price * cartItem.quantity;
      } else {
        // Producto no disponible
        unavailableProducts.push(product._id);
      }
    }

    // Crear el ticket
    const ticket = await ticketDAO.create({
      code: `TCK-${Date.now()}`,
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: req.user ? req.user.email : "ejemplo@gmail.com",
    });

    // Actualizar carrito
    const remainingProducts = cart.products.filter((item) =>
      unavailableProducts.includes(item.product._id)
    );
    cart.products = remainingProducts;
    await cartsModel.findByIdAndUpdate(cid, { products: remainingProducts });

    res.status(200).json({
      success: true,
      ticket,
      unavailableProducts,
    });
  } catch (error) {
    console.error("Error al procesar la compra:", error.message);
    res.status(500).json({
      success: false,
      message: "Error interno al procesar la compra.",
    });
  }
});

router.get("/purchase-summary/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await ticketDAO.find(cid);

    if (!cart) {
      return res.status(404).send("Carrito no encontrado.");
    }

    const ticket = await ticketDAO.findOne({
      purchaser: req.user ? req.user.email : "ejemplo@gmail.com",
    });

    if (!ticket) {
      return res
        .status(404)
        .send("No se encontró un ticket para este carrito.");
    }

    res.render("purchase-summary", {
      cart: cart.products,
      ticket,
    });
  } catch (error) {
    console.error("Error al mostrar el resumen de compra:", error.message);
    res.status(500).send("Error interno al mostrar el resumen de compra.");
  }
});

module.exports = router;
