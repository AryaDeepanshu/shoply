const express = require('express')
const app = express()
const port = 5000

app.use(express.static('public/assets/'))
app.set('view engine', 'ejs')
app.set("views", __dirname + "/public/views")
app.get('/', (req, res)=>{
    res.render("index")
})

app.get('/login', (req, res)=>{
    res.render("login")
})

app.get('/main', (req, res)=>{
    res.render("main")
})

app.get('/signup', (req, res)=>{
    res.render("signup")
})
app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})