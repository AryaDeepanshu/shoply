const CartModel = require('../../models/Cart')

function getCart(req, res){
    if(!req.session.isLoggedIn){
        res.redirect('/login')
    }
    const userId = req.session.userId
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
                    totalPrice: product.price*item.quantity
                }
            })
            res.status(200).send({products})
        }
    }).catch((error) => {
        res.status(500).send({error: "internal server error"})
    })
}

module.exports = getCart