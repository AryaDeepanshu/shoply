const express = require('express')
const session = require('express-session')
const db = require('./utils/db/db')
const app = express()
const port = 5000
const Product = require('./models/Product')
const getProducts = require('./utils/products/getProducts')
const signUp = require('./utils/authentication/signUp')
const login = require('./utils/authentication/login')
const logout = require('./utils/authentication/logout')
app.use(express.static('public/assets/'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set("views", __dirname + "/public/views")
app.use(session({
    secret: 'youwillnotseethisindeployment',
    resave: true,
    saveUninitialized: true,
}))
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
})

app.get('/', (req, res) => {
    res.render('index', {details: req.session.username})
})

app.get('/login', (req, res) => {
    message = req.session.message
    req.session.message = null
    if(req.session.isLoggedIn){
        res.redirect("/main")
        return
    }
    res.render('login', {message: message , details: req.session.username})
})
app.get('/signup', (req, res) => {
    message = req.session.message
    req.session.message = null
    if(req.session.isLoggedIn){
        res.redirect("/main")
        return
    }
    res.render('signup', {message: message, details: req.session.username})
})
app.get('/logout', logout)

app.get('/main', (req, res) => {
    if (!req.session.isLoggedIn){
        res.redirect('/login')
        return
    }
    res.render('main', {details: req.session.username})
})

app.get('/products', getProducts)


app.post('/signup', signUp)
app.post('/login', login)

db.init().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`)
    })
})