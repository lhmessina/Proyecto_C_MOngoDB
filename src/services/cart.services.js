import { cartFiltered } from "../dto/cart.dto.js";
import cartRepository from "../persistence/MongoDB/cart.repository.js";
import { cartModel } from "../persistence/MongoDB/models/cart.model.js"; // para utilizar los metodos del modelo de cart
 
import { productModel } from "../persistence/MongoDB/models/products.model.js";
import productRepository from "../persistence/MongoDB/product.repository.js";
import ticketRepository from "../persistence/MongoDB/ticket.repository.js";
import productServices from "./product.services.js";


const createCart = async () => {
    const cart = await cartRepository.createCart()
    return cart;
}


const getAll = async () => {
    const cart = await cartRepository.getAll()
    return cart;
  };
  
//populate me permite referenciar documentos de otra colecciones ( productos de cart)
const getById =async (id) => {
    const cart = cartRepository.getById(id)
    return cart
}


const addProductToCart = async (cid, pid) => {
     const cart = await cartRepository.addProductToCart(cid,pid)
     return cart;
};


const update_cart = async (cid,cart_id) => {
    const cart = cartRepository.update_cart(cid,cart_id)
    return cart;
}
const delete_cart =async (cid) => {
    

const cart = cartRepository.delete_cart(cid)
return cart;
}

const clear_cart = async (cid) =>{

  const cart = cartRepository.clear_cart(cid)
  
  
    return (cart)
  }



// buscar el cart ( metodo del modelo findByID, cart id ) , buscar en el  el product una vez que encontre el cart , borrar
const delete_prod_from_cart =async (cid,pid) => {
    
    
    const cart = cartRepository.delete_prod_from_cart(cid,pid)
    return cart


                      }
                     
  

  const update_quantity2cart = async(cid, pid,new_stock) => {
    
    const cart = cartRepository.update_quantity2cart(cid,pid,new_stock)
  }
 
 const purchaseCart = async (cid) => {
  const cart = await cartRepository.getById(cid);
  console.log('cart',cart)
  let total = 0;
  const productsWithOutStock = [];

  for (const productCart of cart.products) {
      const product = await productRepository.getById(productCart.product);

      if (product.stock >= productCart.quantity) {
          total += product.price * productCart.quantity;
          console.log('total =',total)
          await productRepository.update(product._id, {stock: product.stock - productCart.quantity})
      } else {
          productsWithOutStock.push(productCart);
          console.log('productsWithOutStock',productsWithOutStock)
      }

      await cartRepository.update_cart(cid, { products: productsWithOutStock });
  }

  return total;
};



  ////////////////////////mi purchase inicio/////////////////////////////////
  // const purchaseCart = async(cid) =>{
  //   // hay q definir  la logica del total , descuento de productos + email del user
   
  //   const cart = await cartRepository.getById(cid)
  //   
  //   console.log('-------------------------------------')
  //   //console.log('filtraoooo',cartFiltered(cart.products))
  //   let productOutOfStock = []
  //   let total = 0
  //   for ( let i = 0; i< cart.products.length ;i++) {
  //      console.log('product in cayo', cart.products[i])
  //      console.log('XXXXXXXXXXXXXXXXXXXXXXX')
  //      console.log('filtrado',cartFiltered(cart.products[i]))
  //      console.log('-------------------------------------')
        
  //      const cartFil = cartFiltered(cart.products[i])
       
  //        if (cartFil.quantity<= cartFil.stock) {
  //          total += cartFil.quantity*cartFil.price
  //         // update cart 
  //         const newStock = cartFil.stock - cartFil.quantity
  //         console.log('new stock', newStock)
  //         console.log( 'para actualizar',cartFil._id)
  //         const updateCart = await cartRepository.update_cart(cid,cartFil._id )
  //         const updateProd = await productServices.prodUpdate(cartFil._id, {stock: newStock})
  //        }
  //        else {
  //         const sinStock = await productServices.getById(cartFil._id)
  //         //productOutOfStock.push(await productServices.getById(cartFil._id))
  //         console.log('producto sin stock', sinStock)
  //         console.log('sin stok',productOutOfStock)
  //        }
  //        await cartRepository.update_cart(cid, { products:productOutOfStock });
  //     console.log ('total', total)

  //   }

    
  
///////////////////////////////////mi purchase fin///////////////////////////////////

export default{
    createCart,
    getById,
    getAll,
    addProductToCart,
    update_cart,
    delete_cart,
    delete_prod_from_cart,
    clear_cart,
    update_quantity2cart,
    purchaseCart
}