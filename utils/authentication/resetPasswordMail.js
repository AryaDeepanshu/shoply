const crypto = require('crypto');
const UserModel = require('../../models/User.js')
const sendMail = require('../mailer/sendMail.js')

function resetPasswordMail(req, res){
    const email = req.body.email;
    UserModel.findOne({email: email}).then((user) => {
        if(!user){
            res.status(200).send()
            return
        }
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token
        user.resetExpires = Date.now() + 3600000; // 1 hour
        user.save().then(()=>{
            const content = {
                subject: "Password Reset Link ",
                text: `You requested for password reset link. The link is valid for 2 hours only<br>: <a href="http://${req.headers.host}/resetPassword?token=${token}">click here </a>to change password`
            }
            sendMail(email, content)
        })
        res.status(200).send()
    })
}

module.exports = resetPasswordMail