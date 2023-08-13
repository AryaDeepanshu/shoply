const ProductModel = require('../../models/Product')
const CartModel = require('../../models/Cart')
async function updateProduct(req, res){
    const {id, Name, price, Quantity, Description} = req.body
    const image = req?.file?.filename
    
    try {
        let product
        let oldProduct = await ProductModel.findById(id)

        if (image) {
            product = await ProductModel.findByIdAndUpdate(id, {Name, price, Description, image, Quantity}, {new: true})
        } else {
            product = await ProductModel.findByIdAndUpdate(id, {Name, price, Description, Quantity}, {new: true})
        }
        
        if (product.Quantity < oldProduct.Quantity) {
            await CartModel.updateMany({}, {$pull: {items: {product: id}}})
        }
        const products = await ProductModel.find()
        if(!products){
            return res.status(404).json({})
        }
        res.status(200).send({products})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}
module.exports = updateProduct