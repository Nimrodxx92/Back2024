const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const collections = "tickets";

const ticketSchema = new Schema({
  code: { type: String, unique: true, default: uuidv4 },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

const Ticket = model(collections, ticketSchema);

module.exports = Ticket;
