 import { request,response } from "express";
//import productDao from "../persistence/MongoDB/product.repository.js"
 import productRepository from "../persistence/MongoDB/product.repository.js";
// import { checkProdInDb } from "./check_product_exist.js";

    
// var myMiddleware = function (param) {
//     if (param === 'A') {
//       return function(req, res, next) { // <---Middleware A
//         // Do A stuff
//         return next();
//       }
//     } else {
//       return function(req, res, next) { // The default middleware
//         // Do default stuff
//         return next();
//     }
//   }


  // export const check_coditions = True

    export const check_conditions = async (req = request, res = response, next) => {
      
   
        //try{  
              
            const {pid}  = req.params;
            //console.log('PIDDDDDDDDDDDDDDDDDDDD',pid) 
            if (pid){
               
             //const productsid = await productDao.getById(pid)
             const productsid = await productRepository.getById(pid)
              // console.log('product_ID',productsid)

               if (! productsid) return res.send(`El producto  ${pid} no existe!` )}
               //return productid
               next()}
  //              res.status(200).json({ status: "success", payload: productsid});}

  //           else{
                
  //               //const products = await productDao.getAll()
  //               const products = await productRepository.getAll()
  //               const {docs} = products
  //               console.log('docssssss',docs[0].title)
  //               const body = req.body;
  //               const { title,description,code, price,status,stock,category,thumbnails} = body;

  //               const newproduct = {
              
  //                       title,
  //                       description,
  //                       code,
  //                       price,
  //                       status:true,
  //                       stock,
  //                       category,
  //                       thumbnails
              
          
  //                                }
        
  //   // verificacion cuando los productos debian ser unicos   
    
  //         // if (docs[0].title == body.title ) {
  //         //    console.log('guaja', docs.length)
             
  //            docs.forEach((elemento) => {
  //             if (elemento.title == body.title)
  //               console.log('del objeto', elemento.title)
  //                return  res.send(`El producto  ${title} ya existe!` )}
  //            );

              
             
  //             //}

  //   //const productExists = docs.find((p) => p.title === title);
  //   //const productExists = products.docs.find((p) => p.title === title);
  //   //console.log('productexist',productExists)
  //   //if (productExists) return  res.send(`El producto  ${title} ya existe!` )
    
  //  // verificacion de campos , admite solo  que falte thumbnails
  //     const checkData = Object.values(newproduct).includes(undefined) && newproduct.thumbnails != "undefined";
    
  //     console.log('checkdata:',checkData)}
    
  //   if (checkData)  
  //     {console.log(checkData)
  //   return res.send(`Todos los campos son obligatorios!` )
  //     }
  //   else{
        
  //       console.log('este es el nuevo prod to add',newproduct)
  //       return next()
       

  //   }}
        

  //           //  catch (error){
  //           //  console.log(error);
  //           //  res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
            
            
  //           // }
          
  //       }

  