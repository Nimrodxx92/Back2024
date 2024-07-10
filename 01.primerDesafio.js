// Para manejar los productos individual
class Products {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

// Para manejar la lista de productos
class ProductManager {
  constructor() {
    this.products = [];
    this.idCounter = 1;
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const codeExists = this.products.find((product) => product.code === code); // verif si exite el código
    if (codeExists) {
      throw new Error(`Producto con código ${code} ya existe.`);
    }

    // Generar un ID al producto
    const id = this.idCounter++;
    const newProduct = new Products(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    newProduct.id = id;

    this.products.push(newProduct); // Agregar el producto al arreglo
    return id; // Devolver el ID generado
  }

  // Método para buscar productos por ID
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }
    return product;
  }
}

module.exports = {
  Products,
  ProductManager,
};
