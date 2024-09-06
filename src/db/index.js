const mongoose = require("mongoose");

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@ecommerce.ivkhnnu.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ecommerce"
    );
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnect;
