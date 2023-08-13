const express = require('express')
const db = require('./utils/db/db')
const session = require('express-session')
const Product = require('./models/Product')
const getCart = require('./utils/cart/getCart')
const addToCart = require('./utils/cart/addToCart')
const login = require('./utils/authentication/login')
const email = require('./utils/mailer/transporter.js')
const addProduct = require('./utils/admin/addProduct')
const verify = require('./utils/authentication/verify')
const signUp = require('./utils/authentication/signUp')
const logout = require('./utils/authentication/logout')
const getProducts = require('./utils/products/getProducts')
const updateProduct = require('./utils/admin/updateProduct')
const deleteProduct = require('./utils/admin/deleteProduct')
const updateQuantity = require('./utils/cart/updateQuantity')
const removeFromCart = require('./utils/cart/removeFromCart')
const resetPassword = require('./utils/authentication/resetPassword')
const changePassword = require('./utils/authentication/changePassword')
const updatePassword = require('./utils/authentication/updatePassword')
const resetPasswordMail = require('./utils/authentication/resetPasswordMail')
const multer  = require('multer')

const port = 8080
const app = express()
const upload = multer({ dest: 'public/assets/uploads/' })
app.use(upload.single('productImage'))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public/assets/'))
app.set("views", __dirname + "/public/views")
app.use(session({
    secret: 'youwillnotseethisindeployment',
    resave: true,
    saveUninitialized: true,
}))
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    next()
})

app.get('/', (req, res) => {
    res.render('main', { details: req.session.username, admin: req.session.isAdmin })
})
app.get('/products', getProducts)

//admin
app.get('/admin', (req, res)=>{
    if(!req.session.isLoggedIn){
        res.redirect('/login')
        return
    }
    if(!req.session.isAdmin){
        res.render('error')
        return
    }
    res.render('admin', { details: req.session.username, admin: req.session.isAdmin })
})
app.get('/admin/update', (req, res)=>{
    if(!req.session.isLoggedIn){
        res.redirect('/login')
        return
    }
    if(!req.session.isAdmin){
        res.render('error')
    }
    res.render('adminUpdate', { details: req.session.username, admin: req.session.isAdmin })
})
app.post('/addProduct', addProduct)
app.post('/admin/update', updateProduct)
app.post('/admin/delete', deleteProduct)

// auth
app.get('/login', (req, res) => {
    message = req.session.message
    req.session.message = null
    if (req.session.isLoggedIn) {
        res.redirect("/")
        return
    }
    res.render('login', { message: message, details: req.session.username, admin: req.session.isAdmin })
})
app.get('/signup', (req, res) => {
    message = req.session.message
    req.session.message = null
    if (req.session.isLoggedIn) {
        res.redirect("/")
        return
    }
    res.render('signup', { message: message, details: req.session.username, admin: req.session.isAdmin })
})
app.post('/login', login)
app.post('/signup', signUp)
app.get('/logout', logout)
app.get('/verify', verify)
app.get('/resetPassword', resetPassword)
app.post('/resetPassword', updatePassword)
app.post('/sendPasswordMail', resetPasswordMail)
app.post('/changePassword', changePassword)
app.get('/changePassword', (req, res) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/login')
        return
    }
    res.render('changePasswordForm', { details: req.session.username, error: null, admin: req.session.isAdmin })
})
app.get('/forgetPassword', (req, res) => {
    res.render('forgetPasswordForm', { details: req.session.username, error: null, admin: req.session.isAdmin })
})

// cart
app.get('/cart', (req, res) => {
    if(!req.session.isLoggedIn){
        res.redirect('/login')
        return
    }
    res.render('cart', { details: req.session.username, admin: req.session.isAdmin})
})
app.get('/getCart', getCart)
app.post('/addToCart', addToCart)
app.post('/updateQuantity', updateQuantity)
app.post('/removeFromCart', removeFromCart)

db.init().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`)
    })
})