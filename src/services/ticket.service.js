// import { ticketModel } from "../persistence/MongoDB/models/ticket.model.js";
// import ticketRepository from "../persistence/MongoDB/ticket.repository.js";
// import cartServices from "./cart.services.js";

// const creteTicket = async( amount,purch_email) => {

// /////////////////////////////////////////
// // code:{
// //     type:String,
// //     required:true,
// //     unique:true
// //      },
// // purchase_datetime :{
// //     type: Date,
// //     default:Date.now()
// // },
// // amount:{
// //     type:Number
// //    } ,  
// // purchaser:{
// //     type:String,
//  let data = {}
//     data = {
//         code: Math.random().toString(36).substr(2, 9),
//         amount: amount,
//         purcharse:purch_email
//     }
// console.log("data",data)



// ///////////////////////////////////////////
// //const cart = cartServices.getById(cid)
// //const ticket = ticketRepository.create(data) SACAAAARRRRRRRRRRRRR
// //return cart
// }

// export default {
//     creteTicket
// }


import ticketRepository from "../persistence/MongoDB/ticket.repository.js"

const createTicket = async (userEmail, totalCart) => {
    const newTicket = {
        amount: totalCart,
        purchaser: userEmail,
        code: Math.random().toString(36).substr(2, 9),
    };
    
    const ticket = await ticketRepository.create(newTicket);
    return ticket;
};

export default { createTicket };
