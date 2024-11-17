fetch("/cartsDB/:cid/purchase", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      window.location.href = `/purchase-summary/${cartId}`;
    } else {
      alert("Error al procesar la compra: " + data.message);
    }
  })
  .catch((err) => console.error("Error:", err));
