import { request, response } from "express";
import productRepository from "../persistence/MongoDB/product.repository.js";
import productServices from "../services/product.services.js";

const createProduct = async(req, res) => {
    
    try{
     const body = req.body;
     
     const product = await productServices.create(body)
     res.status(200).json({ status: "success", msg: `El producto ${body.title} fue agregado` });
     }
  
 
   

  catch (error) {
   console.log(error);
   res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
 }
}

const getAllProducts = async(req,res) => {
    
        try{
          ///////////////////////////////////////////
          const { limit, page, sort, category, status,stock } = req.query;
          
          const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
              price: sort === "asc" ? 1 : -1,
            },
            category:category,
            status:status ,
            learn: true,
          };
            // filtros segun options via query, se puede resolver con switch options
      
            
            if (category) {
              const products = await productServices.getAll({ category }, options);
              return res.status(200).json({ status: "success", products });
            }
        
            if (status) {
              
              const products = await productServices.getAll({ status }, options);
              return res.status(200).json({ status: "success", products });
            }
            if (stock) {
              const products = await productServices.getAll({ stock }, options);
              return res.status(200).json({ status: "success", products });}
      
        
            const products = await productServices.getAll({}, options);
            res.status(200).json({ status: "success", products });
      
      
        } catch(error){
          console.log(error);
          res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
        }
        };
    

const getById = async (req,res) => {
   
            const {pid}  = req.params;
        
             const product = await productServices.getById(pid)
             res.status(200).json({ status: "success", payload: product});
         }

const deleteById = async (req,res) => {


    try {
        const { pid } = req.params;
        
        const product_id = await productServices.getById(pid);
        if (!product_id) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
        else{
        if (product_id.status == false){
          return res.status(500).json({ status: "Error", msg: `El Producto con _id ${pid} ya fue borrado  (status = FALSE)` })}; } 
        
        
        const productsid = await productServices.deleteById(pid);
        
        res.status(200).json({ status: "success", msg: `El producto con el id ${pid} fue eliminado` });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
      }
}

const productUpdate = async (req, res) => {
    try{  
      const { pid } = req.params; 
      const dataUser = req.body; 
      
      const product = await productServices.prodUpdate(pid, dataUser);
      
  
      res.status(200).json({ status: "success", product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }}
export default{

createProduct,
getAllProducts,
getById,
deleteById,
productUpdate



}