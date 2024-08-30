
import mongoose from "mongoose";

const ticketCollection = "ticket"; // Nombre de mi coleccion

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
// Instancio en cartSchema la clase Schema y luego la convierto en modelo  --> mongoose.model(modelName, schema)<--  para poder trabajarla 

const ticketSchema = new mongoose.Schema({

    code:{
        type:String,
        required:true,
        unique:true
         },
    purchase_datetime :{
        type: Date,
        default:Date.now()
    },
    amount:{
        type:Number
       } ,  
    purchaser:{
        type:String,
        
         },        


});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
