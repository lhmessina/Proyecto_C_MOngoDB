
import { Router } from "express";
//import productManager from "../dao/filesystem/productManager.js";
import productDao from "../persistence/MongoDB/product.repository.js";
const router = Router();





// router.get("/", async(req, res) => {

//       const products = await productDao.getAll()
//       console.log('')
//       res.render("home",{products})}) 


     


export default router;
