const CartModel = require('../../models/Cart')
const ProductModel = require('../../models/Product')

async function removeFromCart(req, res) {
    if(!req.session.isLoggedIn){
        res.redirect('/login')
    }
    const userId = req.session.userId
    const productId = req.body.productId

    try {
        const cart = await CartModel.findOne({ user: userId }).populate('items.product')
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' })
        }

        const cartItem = cart.items.find((item) => item.product._id.toString() === productId.toString())
        if (!cartItem) {
            return res.status(404).json({ error: 'Product not found in cart' })
        }

        await CartModel.findOneAndUpdate(
            { user: userId },
            { $pull: { items: { product: productId } } },
            { new: true }
        ).populate('items.product')

        await ProductModel.findByIdAndUpdate(
            productId,
            { $inc: { Quantity: cartItem.quantity } },
            { new: true }
        )

        CartModel.findOne({ user: userId })
        .populate('items.product')
        .then((cart) => {
            if(!cart){
                res.status(200).send({error: "cart not found"})
            }else{
                const products = cart.items.map((item) => {
                    const product = item.product
                    return {
                        id: product._id,
                        image: product.image,
                        title: product.Name,
                        price: product.price,
                        quantity: item.quantity,
                        totalPrice: item.quantity * product.price
                    }
                })
                res.status(200).send({products})
            }
        }).catch((error) => {
            res.status(500).send({error: "internal server error"})
        })
    } catch (error) {
        return res.status(400).json({ error: 'Unable to remove product from cart' })
    }
}

module.exports = removeFromCart