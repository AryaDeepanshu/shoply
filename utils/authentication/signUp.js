const crypto = require('crypto');
const UserModel = require('../../models/User.js')
const sendMail = require('../mailer/sendMail.js')
const isValidPassword = require('./isValidPassword.js')

function signUp(req, res){

    //server side verification
    if(!isValidPassword(req.body.password)){
        res.status(200).send({error: "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special symbol."})
        return
    }

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    UserModel.create(user).then( (addedUser)=>{
        const token = crypto.randomBytes(16).toString('hex')
        addedUser.verifyToken = token
        addedUser.save().then(()=>{
            const content = {
                subject: "Verify your account",
                text: `Click the following link to verify your Shoply account<br><a href='http://${req.headers.host}/verify?token=${token}'>Click here to verify</a>`,
            }
            sendMail(user.email, content)
        })
        res.status(200).send({success: "login with account created"})
        return
    }).catch((error)=>{
        res.status(200).send({error: "Account already exists"})
        return
    })
}

module.exports = signUp