import { prodFiltrado } from "../dto/product.dto.js";
import productRepository from "../persistence/MongoDB/product.repository.js";


const create = async (data) => {
   
    const product = await productRepository.create(data);

}

const getAll = async (query, option) => {

    const product = await productRepository.getAll(query,option)
    
    return product
}

const getById = async (pid) => {
    const product = await productRepository.getById(pid)
    
    
    return product
}

const deleteById = async(pid) =>{

    const product = productRepository.deleteOne(pid)
    
}

const prodUpdate = async (pid,datauser) =>{
   const product = productRepository.update(pid,datauser)
   return product
}

export default{

create , 
getAll,  
getById,
deleteById,
prodUpdate
}