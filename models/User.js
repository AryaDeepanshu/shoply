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
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String,
        default: ''
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    resetExpires: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User