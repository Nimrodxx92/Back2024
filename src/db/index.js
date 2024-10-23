const mongoose = require("mongoose");
const { MONGO_URL } = require("../configs/server.configs");

const mongoConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnect;
