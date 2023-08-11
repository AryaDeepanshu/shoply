const UserModel = require('../../models/User.js')
const isValidPassword = require('./isValidPassword.js')
const changePasswordEmail = require('../mailer/passwordChanged.js')

function changePassword(req, res){
    if(!req.session.isLoggedIn){
        res.redirect('/login')
        return
    }
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    // server-side form validation
    updatePassword = (newPassword === confirmPassword)?newPassword:null
    if(!updatePassword){
        console.log("matcherror")
        res.status(200).send({error: "Confirm new password does not match"})
        return
    }
    if(!isValidPassword(updatePassword)){
        console.log("matcherror")
        res.status(200).send({error: "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special symbol."})
        return
    }

    email = req.session.email
    UserModel.findOne({email: email}).then((user)=>{
        if(user){
            if(user.password != currentPassword){
                console.log("wrongpass")
                res.status(200).send({error: "Wrong Current Password"})
                return
            }
            UserModel.findOneAndUpdate({email: email},{password: updatePassword} ).then(()=>{
                console.log("done")
                changePasswordEmail(email)
                res.status(200).send({sucess: "Password Changed"})
                return
            }).catch((err)=>{
                console.log(err)
            })
        }
    })  
}

module.exports = changePassword