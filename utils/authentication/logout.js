function logout(req, res){
    req.session.destroy(function (err) {
        if (err) {
            console.error(err);
        } else {
            res.render('main', {details: null})
        }
    }); 
}

module.exports = logout