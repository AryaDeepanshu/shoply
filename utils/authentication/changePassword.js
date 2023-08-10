
const UserModel = require('../../models/User.js')
const changePasswordEmail = require('../mailer/passwordChanged.js')
function changePassword(req, res){
    if(!req.session.isLoggedIn){
        res.redirect('/login')
        return
    }
    currentPassword = req.body.current_password
    newPassword = req.body.new_password
    confirmPassword = req.body.confirm_new_password
    updatePassword = (newPassword === confirmPassword)?newPassword:null
    console.log(newPassword, confirmPassword, updatePassword)
    if(!updatePassword){
        res.render('changePassword' ,{details: req.session.username, error: "Confirm new password does not match"})
        return
    }
    email = req.session.email
    UserModel.findOne({email: email}).then((user)=>{
        if(user){
            if(user.password != currentPassword){
                res.render('changePassword' ,{details: req.session.username, error: "Wrong Current Password"})
                return
            }
            UserModel.findOneAndUpdate({email: email},{password: updatePassword} ).then(()=>{
                changePasswordEmail(email)
                res.render('changePassword' ,{details: req.session.username, error:null, sucess: "Password Changed"})
                return
            }).catch((err)=>{
                console.log(err)
            })
        }
    })  
}

module.exports = changePassword