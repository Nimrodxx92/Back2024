const { ProductManager } = require("./src/productManager");

async function testProductManager() {
  try {
    // Llamo a la instancia de ProductManager
    const manager = new ProductManager();

    // Espero a que se carguen los productos
    await manager.loadProducts();

    // Muestro los productos iniciales
    console.log("Productos iniciales:", await manager.getProducts());

    // Agrego el primer producto
    let firstProductId;
    try {
      firstProductId = await manager.addProduct(
        "producto prueba",
        "Este es un producto prueba",
        200,
        "Sin imagen",
        "abc123",
        25
      );
      console.log("ID del primer producto agregado:", firstProductId);
    } catch (error) {
      console.error("Error al agregar el primer producto:", error.message);
    }

    // Agrego un segundo producto
    let secondProductId;
    try {
      secondProductId = await manager.addProduct(
        "Cerveza",
        "Heineken 1 litro",
        2500,
        "Imagen cerveza verde",
        "lks789",
        15
      );
      console.log("ID del segundo producto agregado:", secondProductId);
    } catch (error) {
      console.error("Error al agregar el segundo producto:", error.message);
    }

    // Intento agregar un producto con el mismo código para que arroje un error
    try {
      await manager.addProduct(
        "Producto repetido",
        "Este es otro producto repetido",
        300,
        "Otra imagen",
        "abc123",
        10
      );
    } catch (error) {
      console.error("Error al agregar producto repetido:", error.message);
    }

    // Verifico que los productos fueron agregados correctamente
    try {
      console.log("Productos agregados:", await manager.getProducts());
    } catch (error) {
      console.error("Error al obtener productos:", error.message);
    }

    // Obtengo un producto por ID
    try {
      const productById = await manager.getProductById(firstProductId);
      console.log("Producto encontrado por ID:", productById);
    } catch (error) {
      console.error("Error al obtener producto por ID:", error.message);
    }

    // Intento obtener un producto con un ID que no existe para que arroje un error
    try {
      await manager.getProductById(100);
    } catch (error) {
      console.error(
        "Error al obtener producto por ID inexistente:",
        error.message
      );
    }

    // Actualizo un producto
    try {
      const updatedProduct = await manager.updateProduct(firstProductId, {
        title: "Estufa",
        price: 250,
      });
      console.log("Producto actualizado:", updatedProduct);
    } catch (error) {
      console.error("Error al actualizar producto:", error.message);
    }

    // Eliminar un producto
    try {
      await manager.deleteProduct(firstProductId);
      console.log(
        "Producto eliminado. Productos restantes:",
        await manager.getProducts()
      );
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
    }
  } catch (error) {
    console.error("Error en la prueba del ProductManager:", error.message);
  }
}

testProductManager();
