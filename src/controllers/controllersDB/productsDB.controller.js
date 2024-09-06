const { Router } = require("express");
const { productsModel } = require("../../DAO/models/products.model");
const router = Router();

// Ruta con paginación, ordenamiento y filtro
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, query } = req.query;
    const filter = query
      ? { $or: [{ category: query }, { status: query }] }
      : {};
    const sortOptions = sort === "desc" ? { price: -1 } : { price: 1 };

    const { docs, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } =
      await productsModel.paginate(filter, {
        page,
        limit,
        sort: sort ? sortOptions : {},
        lean: true,
      });
    const Products = docs;
    res.render("home.handlebars", {
      status: "success",
      payload: "Productos cargados con éxito",
      Products,
      totalPages,
      nextPage,
      prevPage,
      hasNextPage,
      hasPrevPage,
      prevLink: hasPrevPage
        ? `/productsDB?page=${prevPage}${
            category ? `&category=${category}` : ""
          }`
        : null,
      nextLink: hasNextPage
        ? `/productsDB?page=${nextPage}${
            category ? `&category=${category}` : ""
          }`
        : null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "No se pudieron obtener los productos",
    });
  }
});

// Ruta para traer el producto de la base por ID
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const products = await productsModel.findById(pid).lean().exec();
    res.json({ status: "success", payload: products });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "No se encontró el producto con ese ID",
    });
  }
});

// Ruta post a la base de MONGO con Postman
router.post("/", async (req, res) => {
  try {
    const newProduct = new productsModel(req.body);
    const savedProduct = await newProduct.save();
    res.json({ status: "success", payload: savedProduct });
  } catch (error) {
    console.error("Error al cargar productos:", error.message);
    res.status(500).json({
      error: "Error interno del servidor",
      message: "No se pudieron cargar los productos",
    });
  }
});

module.exports = router;
