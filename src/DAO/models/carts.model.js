const { Schema, model } = require("mongoose");

const collections = "carts";

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

cartSchema.pre("find", function () {
  this.populate({ path: "products.product", select: "title price _id" });
});

cartSchema.pre("findOne", function () {
  this.populate("products.product");
});
cartSchema.pre("findByIdAndUpdate", function () {
  this.populate("products.product");
});

const cartsModel = model(collections, cartSchema);

module.exports = { cartsModel };
