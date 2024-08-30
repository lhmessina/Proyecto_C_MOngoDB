
//import cartServices from "../persistence/MongoDB/cart.repository.js";
//import productDao from "../persistence/MongoDB/product.repository.js";
import { cartModel } from "../persistence/MongoDB/models/cart.model.js";
import cartRepository from "../persistence/MongoDB/cart.repository.js";
import cartServices from "../services/cart.services.js";
import ticketServices from "../services/ticket.service.js"
import { cookieExtractor } from "../utils/cookieExtractor.js";
import productRepository from "../persistence/MongoDB/product.repository.js";

const createCart = async (req, res) => {

    try{

        const cart = await cartServices.createCart();

    res.status(201).json({ status: "success", cart });
 
    }
    catch (error){
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }

}  
    
const getAllcarts = async (req,res)  => {
    try{

        const cart = await cartServices.getAll();

    res.status(201).json({ status: "ssssuccess", cart });
   
    }
    catch (error){
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }

}
 const getCartbyID = async (req,res) => {
    try{
        const { cid } = req.params;
        const cart_by_id = await cartServices.getById(cid)
        
        if (cart_by_id == null){

            res.status(404).json({ status: "Error", msg: `El carrrito: ${cid}  no exite! ` });

                              }
        else {                      
        res.status(201).json({ status: "success", cart_by_id });
             }   

        }
    catch{res.status(500).json({ status: "Error", msg: "Error interno del servidor" });}
}
const addProductToCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;

      const product = await productRepository.getById(pid);
      if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      const cart = await cartServices.getById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
      
      const cartUpdate = await cartServices.addProductToCart(cid, pid);
  
      res.status(200).json({ status: "success", payload: cartUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

const updateProductInCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const query = req.body;

      const cart = await cartServices.getById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
        
      const cart_f = await cartModel.findById(cid)
      const product_f =  cart_f.products.find((element) => element.product == pid)
      
      if (!product_f)  return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      

      const product = await cartServices.update_quantity2cart(cid,pid,query.quantity)
     
  
      res.status(200).json({ status: "success", payload: product });
       } 
    catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
 }

const deleteProdFromCart = async (req,res) => {
    const {cid, pid} = req.params;
    try{
        console.log( "dentro del delete", cid)
        const cart = await cartServices.delete_prod_from_cart(cid,pid)
       
       res.status(200).json ({status: "success", payload: cart})
    }
    
    
    catch{"error"}
  }

const deleteCart = async (req,res) => {
    try{
        const { cid } = req.params;
        
        const cart_by_id = await cartServices.getById(cid);
        
        if (cart_by_id){
            
        const cart = await cartServices.delete_cart(cid)
        res.status(200).json({ status: "success", msg :`El carrrito: ${cid}  ha sido eliminado `})}
        
        else{    
        
            res.status(404).json({ status: "Error", msg: "Cart no encontrado" });
        }
        
       }
    catch{res.status(500).json({ status: "Error", msg: "Error interno del servidor" });}
}

const clearCart = async (req, res) => {
    try{
    const {cid} = req.params;
    const cart = cartServices.clear_cart(cid);
    res.status(200).json({ status: "success", payload: cart });

    }
    catch{res.status(500).json({ status: "Error", msg: "Error interno del servidor" });}

    
 }

//  const purchaseCart = async (req, res) => {
//      //try{
//      const {cid} = req.params
//      console.log('id del cayo',cid)

    
    ////////////////////////mi purchase////////////////////////////////////////////////////////////////
    //  const purchase = await cartServices.purchaseCart(cid) // debe devolver los datos q necesita el ticket
    //                                                        // amount y purchaser 
    // // console.log ('kkkkkk',purchase)
    //  const {amount, purcharse} = purchase
    // // console.log('yyyy',amount)
    // // console.log('yyyy',purcharse)
    //  const ticket = await ticketService.creteTicket(amount,purcharse)

    // //  console.log ('purchase', purchase)

    //   res.status(200).json({ status: "success", payload: ticket })};

    // //  catch{res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    // //       }
////////////////// fin mi purchase/////////////////////////////////////////

 
 /////////////////////////////////// Profe////////////////////////////////
 const purchaseCart = async (req = request, res = response) => {
  try {
      const { cid } = req.params;
      const cart = await cartServices.getById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

      const total = await cartServices.purchaseCart(cid);
      console.log('email comprador',req.user.email)
      const ticket = await ticketServices.createTicket(req.user.email, total);
      console.log("ticket", ticket)
      res.status(200).json({ status: "success", ticket });
  } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};


 ///////////////////////////////// fin Profe //////////////////////////

export default{

    createCart,
    getAllcarts,
    getCartbyID,
    addProductToCart,
    updateProductInCart,
    deleteProdFromCart,
    deleteCart,
    clearCart,
    purchaseCart
    

}