document.getElementById("logout").addEventListener("click", function () {
  fetch("/auth/logout", { method: "GET" })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/login";
      } else {
        console.error("Error al cerrar sesión", response);
        alert("No se pudo cerrar sesión");
      }
    })
    .catch((error) => {
      console.error("Error en el servidor:", error);
      alert("Error en el servidor");
    });
});
