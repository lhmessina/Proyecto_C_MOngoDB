import mongoose from "mongoose";
import envs  from "./env.conf.js"
export const connectMongoDB = async () => {

    try{
        
       
            
        mongoose.connect(process.env.MONGO_URL)
        console.log( "MongoDB connected")
    }
    catch (err){
        console.log (`${err}`)


    }
    
} 

