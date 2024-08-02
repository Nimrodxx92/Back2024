const express = require("express");
const productsControllers = require("../controllers/products.controllers");
const cartsControllers = require("../controllers/carts.controllers");

const router = express.Router();

router.use("/api/products", productsControllers);
router.use("/api/carts", cartsControllers);

module.exports = router;
