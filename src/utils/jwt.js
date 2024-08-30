import jwt from "jsonwebtoken"
import envs from "../config/env.conf.js"

export const createToken = (user) => {
    
    
    const cartId = user.cart._id
    
    
    
    const {_id, email } = user;
    
    //const token = jwt.sign({_id,email,cartId},envs.JWT_SECRET_CODE,{expiresIn: "1m"});
    const token = jwt.sign({_id,email},envs.JWT_SECRET_CODE,{expiresIn: "10m"});
    return token
}

export const  verifyToken = (token) => {

    try{
        const decoded = jwt.verify(token, envs.JWT_SECRET_CODE)
        return decoded
    }
    catch(error){
        return null
    }
}