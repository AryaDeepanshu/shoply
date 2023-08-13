const ProductModel = require('../../models/Product')

function addProduct(req, res){
    const productName = req.body.productName
    const productPrice = req.body.productPrice
    const productQuantity = req.body.productQuantity
    const productDescription = req.body.productDescription
    const productImage = req.file.filename

    const product = new ProductModel({
        Name: productName,  
        Description: productDescription,
        price: productPrice,
        Quantity: productQuantity,
        image: productImage,
        createdBy: req.session.username
    })
    product.save()
    .then((result) => {
        res.status(200).json({product})
    })    
}

module.exports = addProduct 