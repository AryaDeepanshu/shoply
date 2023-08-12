const CartModel = require('../../models/Cart')
const ProductModel = require('../../models/Product')

function addProduct(req, res){
    if(!req.session.isLoggedIn){
        res.redirect('/login')
        return
    }
    const userId = req.session.userId 
    const productId = req.body.productId 
    ProductModel.findById(productId).then((product) => {
        if(!product){
            res.status(200).send({error: "product not found"})
        }else{
            CartModel.findOne({ user: userId }).then((cart) => {
                if(!cart){
                    // Create new cart document if one does not exist for the user
                    CartModel.create({
                        user: userId,
                        items: [{
                            product: productId,
                            quantity: 1
                        }]
                    }).then(() => {
                        res.status(200).send({success: "product added to cart"})
                    }).catch((error) => {
                        res.status(500).send({error: "internal server error"})
                    })
                }else{
                    // Update the existing cart document with the new item
                    const itemIndex = cart.items.findIndex(item => item.product.equals(productId))
                    if(itemIndex === -1){
                        // Add a new item to the cart if the product is not already in the cart
                        cart.items.push({
                            product: productId,
                            quantity: 1
                        })
                    }else{
                        // Increment the quantity of the existing item if the product is already in the cart
                        cart.items[itemIndex].quantity++
                    }
                    cart.save().then(() => {
                        res.status(200).send({success: "product added to cart"})
                    }).catch((error) => {
                        res.status(500).send({error: "internal server error"})
                    })
                }
            })
        }
        product.Quantity -= 1
        product.save()
    })
}

module.exports = addProduct