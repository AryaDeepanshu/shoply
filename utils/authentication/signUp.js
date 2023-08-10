const UserModel = require('../../models/User.js')

function signUp(req, res){
    console.log(req.body)
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    UserModel.create(user).then( (user)=>{
        req.session.message = "login with account created"
        res.status(200).redirect('/login')
    }).catch( (error)=>{
        req.session.message = "Account already exists"
        res.status(500).redirect('/signup')
        return
    })
}

module.exports = signUp