const fs = require("fs").promises;

class CartManager {
  constructor() {
    this.cartsJson = "./carts.json";
    this.carts = [];
    this.loadCarts(); // Cargar los carritos al iniciar
  }

  // Cargar los carritos iniciales del JSON
  async loadCarts() {
    try {
      const data = await fs.readFile(this.cartsJson, "utf-8");
      this.carts = JSON.parse(data);
      return this.carts;
    } catch (error) {
      console.error("Error al cargar los carritos:", error.message);
      this.carts = [];
    }
  }

  // Guardar los carritos
  async saveCarts() {
    const data = JSON.stringify(this.carts, null, 2);
    return fs.writeFile(this.cartsJson, data, "utf-8");
  }

  // Crear un nuevo carrito
  async createCart() {
    const maxId = this.carts.reduce((max, cart) => Math.max(max, cart.id), 0); // Calcular el ID máximo actual
    const newId = maxId + 1;

    const newCart = {
      id: newId,
      products: [],
    };

    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  // Obtengo los productos de un carrito específico por ID
  getCartById(id) {
    const cart = this.carts.find((cart) => cart.id === id);
    return cart || null;
  }

  // Agregar un producto a un carrito
  async addProductToCart(cartId, productId) {
    try {
      let cart = this.getCartById(cartId);
      if (!cart) {
        cart = await this.createCart();
      }

      const productIndex = cart.products.findIndex(
        (item) => item.productId === productId
      ); // Buscar si el producto ya está en el carrito

      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1; // Si el producto ya está en el carrito, actualizar la cantidad
      } else {
        cart.products.push({ producto: productId, quantity: 1 });
      }

      await this.saveCarts();
      return cart;
    } catch (error) {
      throw new Error(
        `No se pudo agregar el producto al carrito: ${error.message}`
      );
    }
  }
}

module.exports = {
  CartManager,
};
