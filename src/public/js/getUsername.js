// Función para obtener nombre de usuario al cargar la página
const getUsername = async () => {
  try {
    const { value: username } = await Swal.fire({
      title: "Bienvenido",
      text: "Ingresa tu nombre",
      input: "text",
      inputPlaceholder: "Tu nombre",
      inputValidator: (value) => {
        if (!value) {
          return "¡El nombre es obligatorio!";
        }
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    if (username) {
      socket.emit("newUser", { user: username }); // Emitir el nombre de usuario al servidor

      // Mostrar alerta de conexión
      socket.on("userConnected", (user) => {
        Swal.fire({
          icon: "success",
          title: `Se ha conectado ${user.user}`,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      });
    }
  } catch (error) {
    console.error("Error al obtener nombre de usuario:", error);
  }
};

getUsername();
