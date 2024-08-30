import { ticketModel } from "./models/ticket.model.js";

const create = async (data) => {
  const ticket = await ticketModel.create(data);
   return ticket
}


    const getAll = async (query, option) => {
    const ticket = await ticketModel.paginate(query, option)
        return ticket; 
      };
  
  const getById = async (id) => {
    const ticket = await ticketModel.findById(id);
    return ticket;
     };
  
 
  const update = async (id, data) => {
    const ticketUpdate = await ticketModel.findByIdAndUpdate(id, data, { new: true });
    return ticketUpdate;
  };
  
  const deleteOne = async (id) => {
    const ticket = await ticketModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return ticket;
  };
  
  // exporto default para importar el ticket.dao y usar sus metodos en el  router con los req res de
  // los endpoint definidos en ticket.router
  export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
  }
  