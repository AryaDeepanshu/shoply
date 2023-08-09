const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    isActive : {
        type: Boolean,
        default: true
    },
    isAdmin: {
        Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User