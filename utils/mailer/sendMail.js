const nodemailer = require("nodemailer");
const transporter = require("./transporter")();

function sendmail(email, content){
    var message = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: content.subject,
        html: content.text,
    }
    transporter.sendMail(message, function(err) {
        if (err) {
            console.log(err)
        }
    });
}

module.exports = sendmail