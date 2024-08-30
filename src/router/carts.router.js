import {Router} from 'express';
//import fs from "fs";
//import cartManager from "../cartManager.js"
// import productDao from '../repository/MongoDB/product.dao.js';
// import cartDao from '../repository/MongoDB/cart.dao.js';
// import { cartModel } from '../repository/MongoDB/models/cart.model.js';
// import { productModel } from '../repository/MongoDB/models/products.model.js';
import cartsController from '../controllers/carts.controller.js';
import { authorization } from '../middlewares/authorization.middleware.js';

const router = Router();





router.post ("/" ,cartsController.createCart);

router.get("/", cartsController.getAllcarts);

router.get("/:cid", cartsController.getCartbyID );

router.post("/:cid/product/:pid", cartsController.addProductToCart );

router.put("/:cid/product/:pid",authorization("user"), cartsController.updateProductInCart );

router.delete("/:cid/product/:pid",authorization("user") ,authorization("user"),cartsController.deleteProdFromCart)

router.delete("/:cid",authorization("user") ,cartsController.deleteCart)

router.put("/:cid",authorization("user"), cartsController.clearCart)

//router.get ("/:cid/purchase" ,authorization("user") ,cartsController.purchaseCart); 
router.get ("/:cid/purchase" ,cartsController.purchaseCart);

export default router;