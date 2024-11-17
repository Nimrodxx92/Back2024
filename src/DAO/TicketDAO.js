const Ticket = require("../DAO/models/ticket.model");

class TicketDAO {
  find = async () => {
    try {
      const tickets = await Ticket.find().lean();
      return tickets;
    } catch (error) {
      return error;
    }
  };

  create = async (ticket) => {
    try {
      const response = await Ticket.create(ticket);
      return response;
    } catch (error) {
      return error;
    }
  };

  findOne = async (filter) => {
    try {
      const ticket = await Ticket.findOne(filter).lean();
      return ticket;
    } catch (error) {
      return error;
    }
  };

  deleteOne = async (_id) => {
    const filter = { _id: _id };
    try {
      const response = await Ticket.deleteOne(filter);
      return response;
    } catch (error) {
      return error;
    }
  };

  updateOne = async (_id, ticket) => {
    const filter = { _id: _id };
    try {
      const response = await Ticket.updateOne(filter, ticket);
      return response;
    } catch (error) {
      return error;
    }
  };
}

module.exports = TicketDAO;
