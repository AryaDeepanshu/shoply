const UserModel = require('../../models/User.js')
const sendMail = require('../mailer/sendMail.js')
const isValidPassword = require('./isValidPassword.js')

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
        res.status(200).send({error: "Confirm new password does not match"})
        return
    }
    if(!isValidPassword(updatePassword)){
        res.status(200).send({error: "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special symbol."})
        return
    }

    email = req.session.email
    UserModel.findOne({email: email}).then((user)=>{
        if(user){
            if(user.password != currentPassword){
                res.status(200).send({error: "Wrong Current Password"})
                return
            }
            user.password = updatePassword
            user.save().then(()=>{
                content = {
                    subject: "ALERT: Password Changed",
                    html: "Your shoply account password was changed successfully.",
                }
                sendMail(email, content)
                res.status(200).send({sucess: "Password Changed"})
            })
        }
    })  
}

module.exports = changePassword