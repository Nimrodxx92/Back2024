const socketIo = require("socket.io");

const setupSocketIo = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("Un usuario se ha conectado");

    socket.on("newUser", (user) => {
      socket.username = user.user;
      console.log(`Nuevo usuario conectado: ${socket.username}`);
      io.emit("userConnected", { user: socket.username });
    });

    socket.on("productUpdate", (product) => {
      io.emit("productUpdated", product);
    });

    socket.on("disconnect", (user) => {
      io.emit("userDisconnected", {
        user: socket.username,
        message: "Un usuario se ha desconectado",
      });
      console.log(`El usuario ${socket.username} se ha desconectado`);
    });
  });

  return io;
};

module.exports = setupSocketIo;
