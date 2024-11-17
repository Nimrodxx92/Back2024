const { Router } = require("express");
const productsControllers = require("../controllers/products.controllers");
const cartsControllers = require("../controllers/carts.controllers");
const realtimeControllers = require("../controllers/realtimeproducts.controllers");
const productsDBController = require("../controllers/controllersDB/productsDB.controllers");
const cartsDBController = require("../controllers/controllersDB/cartDB.controllers");
const viewsDBController = require("../controllers/controllersDB/views-template.controllers");
const usersController = require("../controllers/controllersDB/users.controllers");
const authController = require("../controllers/controllersDB/auth.controllers");
const sessionsController = require("../controllers/controllersDB/sessions.controllers");
const purchaseController = require("../controllers/controllersDB/purchase.controllers");

const router = Router();

router.use("/api/products", productsControllers);
router.use("/api/carts", cartsControllers);
router.use("/realtimeproducts", realtimeControllers);
router.use("/productsDB", productsDBController);
router.use("/cartsDB", cartsDBController);
router.use("/auth", authController);
router.use("/users", usersController);
router.use("/", viewsDBController);
router.use("/api/sessions", sessionsController);
router.use("/", purchaseController);

module.exports = router;
