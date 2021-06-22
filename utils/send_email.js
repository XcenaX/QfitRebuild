var nodemailer = require('nodemailer');
const config = require("./config");

module.exports.sendEmail = (to, subject, message) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.EMAIL_HOST_USER,
            pass: config.EMAIL_HOST_PASSWORD
        }
    });

    var mailOptions = {
        from: config.EMAIL_HOST_USER,
        to: to,
        subject: subject,
        html: message
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
} 