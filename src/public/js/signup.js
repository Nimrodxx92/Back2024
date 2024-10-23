function submitForm() {
  // Obtengo los valores de los inputs
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  // Valido que las contraseñas coincidan
  const errorMessage = document.getElementById("error-message");
  if (password !== confirmPassword) {
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  // Crear el cuerpo del request
  const formData = {
    first_name: nombre,
    last_name: apellido,
    email: email,
    age: age,
    password: password,
  };

  // Enviar la solicitud al servidor
  fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Cuenta creada exitosamente");
        window.location.href = "/login";
      } else {
        alert("Error al crear la cuenta: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error en el servidor");
    });
}
