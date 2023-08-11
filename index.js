const express = require('express')
const db = require('./utils/db/db')
const session = require('express-session')
const Product = require('./models/Product')
const login = require('./utils/authentication/login')
const email = require('./utils/mailer/transporter.js')
const verify = require('./utils/authentication/verify')
const signUp = require('./utils/authentication/signUp')
const logout = require('./utils/authentication/logout')
const getProducts = require('./utils/products/getProducts')
const resetPassword = require('./utils/authentication/resetPassword')
const changePassword = require('./utils/authentication/changePassword')
const updatePassword = require('./utils/authentication/updatePassword')
const resetPasswordMail = require('./utils/authentication/resetPasswordMail')

const port = 8080
const app = express()

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
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
})

app.get('/', (req, res) => {
    res.render('index', { details: req.session.username })
})

app.get('/main', (req, res) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/login')
        return
    }
    res.render('main', { details: req.session.username })
})


app.get('/login', (req, res) => {
    message = req.session.message
    req.session.message = null
    if (req.session.isLoggedIn) {
        res.redirect("/main")
        return
    }
    res.render('login', { message: message, details: req.session.username })
})

app.get('/signup', (req, res) => {
    message = req.session.message
    req.session.message = null
    if (req.session.isLoggedIn) {
        res.redirect("/main")
        return
    }
    res.render('signup', { message: message, details: req.session.username })
})


app.get('/changePassword', (req, res) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/login')
        return
    }
    res.render('changePasswordForm', { details: req.session.username, error: null })
})

app.get('/forgetPassword', (req, res) => {
    res.render('forgetPasswordForm', { details: req.session.username, error: null })
})

app.get('/logout', logout)
app.get('/verify', verify)
app.get('/products', getProducts)
app.get('/resetPassword', resetPassword)


app.post('/login', login)
app.post('/signup', signUp)
app.post('/resetPassword', updatePassword)
app.post('/sendPasswordMail', resetPasswordMail)
app.post('/changePassword', changePassword)


db.init().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`)
    })
})