function deleteProduct(cid, pid) {
  if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
    fetch(`/cartsDB/${cid}/products/${pid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Producto eliminado con éxito.");
          location.reload(); // Recargar la página para ver los cambios
        } else {
          alert("Error al eliminar el producto.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar el producto.");
      });
  }
}
