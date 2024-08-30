import { request,response } from "express";
//import productDao from "../persistence/MongoDB/product.repository.js"
import productRepository from "../persistence/MongoDB/product.repository.js";



export const checkProdInDb = async (req =request,res = response, next) => {
      try{
           const products = await productRepository.getAll()
                const {docs} = products
                const body = req.body;
                const { title,description,code, price,status,stock,category,thumbnails} = body;
                
                const newproduct = {
              
                        title,
                        description,
                        code,
                        price,
                        status:true,
                        stock,
                        category,
                        thumbnails
 
                                 }
        
        
             let exist = false
             docs.forEach ((elemento) => {elemento.title  
                console.log('del objeto', elemento.title)       
                if (elemento.title == body.title)
                                                    {
                 exist = true   
                                                  
                 console.log('del objeto en nuevo midd', elemento.title) } })

                 console.log('existttt',exist)
                 if (exist) return res.status(400).json({ status: "Error", msg: `El producto ${title} ya existe` })
    
                         
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const checkData = Object.values(newproduct).includes(undefined) && newproduct.thumbnails != "undefined" ;
                //  console.log('new product',newproduct)
                //  console.log('checkdata:',checkData)
                       
                if (checkData)  {
                
                 return res.send(`Todos los campos son obligatorios!` )
                     }
                 
                  else {
                             console.log('este es el nuevo prod to add',newproduct)}
         
                          
                   next()   }      
      catch (error){
              console.log(error);
             res.status(500).json({ status: "Error", msg: "Error interno del servidor" })
                             }};
                            
                               
                               
                               
                             
                          
