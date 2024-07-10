const { ProductManager } = require("./01.primerDesafio");

/* PROBANDO LA FUNCIÓN */
const manager = new ProductManager(); // llamo a la función ProductManager
console.log("Productos iniciales:", manager.getProducts()); // Llamo a getProducts para devolver un []

// Agrego el primer producto
const firstProduct = manager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
console.log("ID del primer producto agregado:", firstProduct);

// Agrego un segundo producto
const secondProduct = manager.addProduct(
  "Cerveza",
  "Heineken 1 litro",
  2500,
  "Imagen cerveza verde",
  "lks789",
  15
);
console.log("ID del segundo producto agregado:", secondProduct);

// Verifico que el producto fue agregado correctamente
console.log("Productos agregados:", manager.getProducts());

// Intento agregar un producto con el mismo código para que arroje un error)
try {
  manager.addProduct(
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

// Obtener un producto por ID
try {
  const productById = manager.getProductById(1);
  console.log("Producto encontrado por ID:", productById);
} catch (error) {
  console.error("Error al obtener producto por ID:", error.message);
}

// Intento obtener un producto con un ID que no existe para que arroje un error)
try {
  manager.getProductById(100);
} catch (error) {
  console.error("Error al obtener producto por ID inexistente:", error.message);
}
