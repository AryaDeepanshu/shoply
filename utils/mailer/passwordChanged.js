const nodemailer = require("nodemailer");

transport = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: process.env.EMAIL_PORT,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

function passwordChangeEmail(email){
    var message = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "ALERT: Password Changed",
        text: "Your shoply account password was changed successfully.",
    }
    transport.sendMail(message, function(err) {
        if (err) {
            console.log(err)
        }
    });
}


module.exports = passwordChangeEmail