import bcrypt, { genSaltSync } from 'bcrypt'

export const createHash = function (password) {

   const has_pass=  bcrypt.hashSync(password,bcrypt.genSaltSync(10));
   return has_pass;
}

 

export const isValidPassword = (password,userPassword) => {
   // console.log('password', password)
   // console.log('user pass',userPassword)
   
   return bcrypt.compareSync(password,userPassword)
    
}