const CartModel = require('../../models/Cart')
const ProductModel = require('../../models/Product')

function updateQuantity(req, res){
    if(!req.session.isLoggedIn){
        res.redirect('/login')
    }
    const userId = req.session.userId
    const productId = req.body.productId
    const change = req.body.change

    CartModel.findOne({ user: userId })
        .populate('items.product')
        .then((cart) => {
            if(!cart){
                res.status(200).send({error: "cart not found"})
                return
            }else{
                const item = cart.items.find((item) => item.product._id.toString() === productId.toString())
                if(!item){
                    res.status(200).send({error: "item not found"})
                    return
                }else{
                    ProductModel.findOne({_id: productId})
                    .then((product)=>{
                        if(product.Quantity < 1 && change === 1){
                            res.status(200).send({error: "limit"})
                            return
                        }
                        item.quantity += change
                        if(item.quantity < 1){
                            cart.items = cart.items.filter((item) => item.product._id.toString() !== productId.toString())
                        }
                        cart.save()
                            .then(() => {
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
                                ProductModel.findByIdAndUpdate(
                                    productId,
                                    { $inc: { Quantity: change === 1 ? -1 : 1 } },
                                    { new: true }
                                ).then(()=>{
                                    res.status(200).send({products})
                                    return
                                })
                            })
                            
                        })
                        .catch((error) => {
                            res.status(500).send({error: "internal server error"})
                            return
                        })
                }
            }
        }).catch((error) => {
            res.status(500).send({error: "internal server error"})
        })
}

module.exports = updateQuantity
