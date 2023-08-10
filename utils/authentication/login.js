const UserModel = require('../../models/User.js')

function login(req, res){
    let email = req.body.email
    let password = req.body.password
    UserModel.findOne({email: email, password: password}).then((user)=>{
        if(!user){
            req.session.message = "Wrong credentials"
            res.status(200).redirect('/login')
            return
        }
        req.session.username = user.username
        req.session.email = user.email
        req.session.isLoggedIn = true
        res.redirect("/main")

    }).catch((error)=>{
        req.session.message = error.message
        res.status(500).redirect('/login')
        return
    })
}

module.exports = login