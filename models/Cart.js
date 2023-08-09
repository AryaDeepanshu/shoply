const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    owner: String,
    Description: String,
    price: Number,
    Quantity: {
        type: Number,
        default: 0
    },
    image: String,
    createdBy: String
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product