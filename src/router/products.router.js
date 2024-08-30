import {Router} from 'express';
//import {check_conditions} from "../middlewares/check_conditions.js" 
import productDao from '../persistence/MongoDB/product.repository.js';
import {check_Token} from "../middlewares/check_token_middleware.js" 
const router = Router();
import productController from '../controllers/product.controller.js';
import { checkProdInDb } from '../middlewares/check_product_exist.js';
import { check_conditions } from '../middlewares/check_conditions.js';
import { authorization } from '../middlewares/authorization.middleware.js';


/////////////////////////////////////////////////////COOKIES///////////////////////////

router.post("/",authorization("admin"), checkProdInDb,productController.createProduct );

//router.get("/", check_Token , authorization("user"), productController.getAllProducts)
router.get("/" ,  check_Token, productController.getAllProducts)
//router.get("/:pid",checkProdInDb, productController.getById)
router.get("/:pid",check_conditions,productController.getById)

router.delete("/:pid", authorization("admin"), productController.deleteById);

//router.put("/:pid",checkProdInDb, productController.productUpdate  );
router.put("/:pid",authorization("admin"), check_conditions ,productController.productUpdate  );


///////////////////////////////////////////////////////////////////////////////////////



//opciones de filtrado recibidas por query



  
  

  

    
     


    

export default router;  //para poder importarlo en app.js