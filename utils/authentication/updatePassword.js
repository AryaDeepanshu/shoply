const UserModel = require('../../models/User.js')
const sendMail = require('../mailer/sendMail.js')
const isValidPassword = require('./isValidPassword.js')

function updatePassword(req, res){
    const newPassword = req.body.newPassword.trim()
    const confirmPassword = req.body.confirmPassword.trim()
    const updatePassword = (newPassword === confirmPassword)?newPassword:null
    if(!updatePassword){
        res.status(200).send({error: "Confirm New password does not match"})
        return
    }
    if(!isValidPassword(updatePassword)){
        res.status(200).send({error: "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special symbol."})
        return
    }
    const token = req.body.token
    UserModel.findOne({resetPasswordToken: token}).then((user)=>{
        user.password = updatePassword
        user.resetPasswordToken = ''
        user.save().then(()=>{
            const content = {
                subject: "Password Updated Successfully",
                text: `Your shoply password was updated through forgot password as per you request`
            }
            sendMail(user.email, content)
            res.status(200).send({success: "Password Reset, you will be redirecred in 5 seconds"})
        })
    })
}

module.exports = updatePassword