import productServices from "../services/product.services.js";

export const prodFiltrado = async (product) => {
    //const product = productServices.getById(pid)

    const productFi = {

        title : product.title,
        description: product.description,
        stock : product.stock,
        quantity:product.quantity,
        price:product.price
    }
return productFi
}
