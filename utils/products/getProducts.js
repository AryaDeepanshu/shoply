const ProductModel = require('../../models/Product')

function getProducts(req, res){
    ProductModel.find().then((Products)=>{
        if(Products.length === 0){
            conosle.log("no data")
            res.status(200)
            res.json([])
        }else{
            res.status(200)
            res.json(Products)
        }  
    })
}

module.exports = getProducts