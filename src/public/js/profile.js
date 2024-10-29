const token = localStorage.getItem("jwtToken");
console.log("Token enviado:", token);

fetch("/profile", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + token,
  },
})
  .then((response) => {
    console.log("Respuesta del servidor:", response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Perfil:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
