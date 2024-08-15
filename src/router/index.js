const express = require("express");
const productsControllers = require("../controllers/products.controllers");
const cartsControllers = require("../controllers/carts.controllers");
const realtimeControllers = require("../controllers/realtimeproducts.controllers");

const router = express.Router();

router.use("/api/products", productsControllers);
router.use("/api/carts", cartsControllers);
router.use("/realtimeproducts", realtimeControllers);

module.exports = router;
