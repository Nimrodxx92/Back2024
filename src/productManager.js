const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.productsJson = "./products.json";
    this.products = [];
    this.loadProducts(); // Carga los productos al iniciar
  }

  // Cargar los productos iniciales del JSON
  async loadProducts() {
    try {
      const data = await fs.readFile(this.productsJson, "utf-8");
      this.products = JSON.parse(data);
      return this.products;
    } catch (error) {
      console.error("Error al cargar los productos:", error.message);
      return null;
    }
  }

  // Guardar los productos
  async saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    return fs.writeFile(this.productsJson, data, "utf-8");
  }

  // Verifica que haya un limit y sino, muestra todos los productos
  getProducts(limit) {
    if (this.products === null || this.products === undefined) {
      throw new Error("No se pudieron cargar los productos desde el servidor.");
    }
    if (limit) {
      this.products.slice(0, limit);
    }
    return this.products;
  }

  // Busco un producto por ID
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    return product || null;
  }

  // Agrego un producto con un nuevo ID
  async addProduct(product) {
    console.log("Producto recibido para agregar:", product);
    const { title, description, price, thumbnail, code, stock, category } =
      product;
    if (
      !title ||
      !description ||
      !price ||
      !code ||
      !thumbnail ||
      !stock ||
      !category
    ) {
      console.error("Todos los campos son obligatorios");
      return;
    }
    const codeExists = this.products.find((product) => product.code === code);
    if (codeExists) {
      console.error(`Producto con código ${code} ya existe.`);
      return;
    }

    // Calculo el ID máximo actual
    const maxId = this.products.reduce(
      (max, product) => Math.max(max, product.id),
      0
    );
    const newId = maxId + 1;

    const newProduct = {
      id: newId,
      title,
      description,
      price,
      thumbnail,
      code,
      category,
      status: true,
      stock,
    };

    this.products.push(newProduct);
    await this.saveProducts();
    return newProduct;
  }

  // Actualizo un producto que ya existe
  async updateProduct(id, updatedFields) {
    try {
      const productIndex = this.products.findIndex(
        (product) => product.id === Number(id)
      );
      if (productIndex === -1) {
        return null;
      }
      // Mantener el ID y actualizar los otros campos
      const updatedProduct = {
        ...this.products[productIndex],
        ...updatedFields,
      };
      this.products[productIndex] = updatedProduct;
      await this.saveProducts(); // Guardo los cambios en el archivo
      return updatedProduct;
    } catch (error) {
      throw new Error("No se pudo actualizar el producto");
    }
  }

  // Borro el producto por ID
  async deleteProduct(id) {
    try {
      const index = this.products.findIndex(
        (product) => product.id === Number(id)
      );
      if (index === -1) {
        return false;
      }
      this.products.splice(index, 1);
      await this.saveProducts(); // Guardo los cambios en el archivo
      return true;
    } catch (error) {
      throw new Error("No se pudo eliminar el producto");
    }
  }
}

module.exports = {
  ProductManager,
};
