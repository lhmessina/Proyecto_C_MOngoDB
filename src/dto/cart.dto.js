

export const cartFiltered = (product) => {
    console.log('esto pasa al filtro de producto',product)
    const cartFilt ={

        _id:product.product._id,
        stock:product.product.stock,
        price:product.product.price,
        quantity:product.quantity,

    }
    return cartFilt
}