const UserModel = require('../../models/User.js')

function loginAUthentication(req, res){
    let email = req.body.email
    let password = req.body.password
    UserModel.findOne({email: email, password: password}).then((user)=>{
        if(!user){
            req.session.message = "Wrong credentials"
            res.status(200).redirect('/login')
            return
        }
        // will login here

    }).catch((error)=>{
        req.session.message = error.message
        res.status(500).redirect('/login')
        return
    })
}

module.exports = loginAUthentication