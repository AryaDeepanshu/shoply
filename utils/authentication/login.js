const UserModel = require('../../models/User.js')

function login(req, res){
    let email = req.body.email
    let password = req.body.password
    UserModel.findOne({email: email, password: password}).then((user)=>{
        if(!user){
            res.status(200).send({error: "Wrong credentials"})
            return
        }
        if(!user.isVerified){
            res.status(200).send({error: "Please verify your email first"})
            return
        }
        req.session.username = user.username
        req.session.email = user.email
        req.session.isLoggedIn = true
        res.status(200).send({login: true})
        return

    }).catch((error)=>{
        res.status(500).send({error: error})
    })
}

module.exports = login