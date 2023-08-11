const UserModel = require('../../models/User.js')

function resetPassword(req, res){

    if(!req.query.token){
        res.render('resetPasswordForm', {token: null, error: 'Invalid link'})
        return
    }else if(req.query.token){
        UserModel.findOne({resetPasswordToken: req.query.token}).then((user)=>{
            if(!user){
                res.render('resetPasswordForm', {token: null, error: 'Invalid link'})
                return
            }
            else{
                if(user.resetExpires < Date.now()){
                    res.render('resetPasswordForm', {token: null, error: 'Link expired'})
                    return
                }
                else
                    res.render('resetPasswordForm', {details: null, token: req.query.token, error:null})
            }
        })
    }
}

module.exports = resetPassword