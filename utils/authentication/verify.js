const UserModel = require('../../models/User.js')

function verify(req, res){
    token = req.query.token
    UserModel.findOne({verifyToken: token}).then((user)=>{
        if(!user){
            res.status(200).render('verify', {error: "invalid Link"})
            return
        }
        user.isVerified = true
        user.verifyToken = ''
        user.save().then(()=>{
            res.status(200).render('login', {details:null, message:"Email verified. You can login"})
        })
    })
}

module.exports = verify