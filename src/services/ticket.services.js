const TicketModel = require("../DAO/models/ticket.model");
const crypto = require("crypto");

class TicketService {
  static async createTicket({ amount, purchaser }) {
    const code = crypto.randomBytes(8).toString("hex");
    return await TicketModel.create({
      code,
      amount,
      purchaser,
    });
  }
}

module.exports = TicketService;
