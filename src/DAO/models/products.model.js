const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const collections = "products";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  code: { type: String, unique: true },
  stock: { type: Number, default: 0 },
  status: { type: Boolean },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.plugin(mongoosePaginate);
const productsModel = model(collections, productSchema);

module.exports = {
  productsModel,
};
