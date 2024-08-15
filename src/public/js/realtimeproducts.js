const socket = io();

// Actualizar la lista de productos en tiempo real
socket.on("productUpdated", (product) => {
  const productList = document.getElementById("productList");

  if (product.deleted) {
    // Eliminar el producto de la lista
    const item = document.getElementById(`product-${product.id}`);
    if (item) {
      item.remove();
      Swal.fire({
        title: "Producto eliminado correctamente",
        text: `Se eliminó el producto con ID: ${product.id}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }
  } else {
    // Agregar el producto a la lista
    const item = document.createElement("li");
    item.id = `product-${product.id}`;
    item.textContent = `${product.title} - ${product.price}`;
    productList.appendChild(item);
    Swal.fire({
      title: "Producto agregado correctamente",
      text: `Se agregó ${product.title} con el ID: ${product.id}`,
      icon: "info",
      confirmButtonText: "Aceptar",
    });
  }
});

// Formulario para agregar el producto nuevo
document.getElementById("productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
  };
  fetch("/realtimeproducts/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then(() => {
      document.getElementById("productForm").reset();
    })
    .catch((error) => {
      console.error("Error al agregar producto:", error);
    });
});

// Formulario para eliminar un producto por ID
document
  .getElementById("deleteProductForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("deleteId").value;

    // Mostrar la alerta de confirmación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás por eliminar el producto con ID: ${id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      fetch("/realtimeproducts/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, deleted: true }),
      })
        .then(() => {
          document.getElementById("deleteProductForm").reset();
        })
        .catch((error) => {
          console.error("Error al eliminar producto:", error);
        });
    }
  });
