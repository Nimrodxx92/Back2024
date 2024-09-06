function addToCart(productId) {
  fetch("/cartsDB/add-to-cart", {
    // Asegúrate de que la URL es la correcta
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Producto agregado al carrito!");
      } else {
        alert("Error al agregar el producto al carrito: " + data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al agregar el producto al carrito");
    });
}
