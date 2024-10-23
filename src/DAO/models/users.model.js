const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: Schema.Types.ObjectId, ref: "Carts" },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = model("User", userSchema);
