const ProductModel = require('../../models/Product')
const CartModel = require('../../models/Cart')

async function deleteProduct(req, res){
    const productId  = req.body.id
    
    try {
        // Remove product from ProductModel
        await ProductModel.findByIdAndDelete(productId)
        
        // Remove product from all carts
        await CartModel.updateMany({}, {$pull: {items: {product: productId}}})
        const products = await ProductModel.find()
        if(!products){
            return res.status(404).json({})
        }
        res.status(200).send({products})
    } catch (error) {
        res.status(500).json({message: 'Error deleting product'})
    }
}


module.exports = deleteProduct