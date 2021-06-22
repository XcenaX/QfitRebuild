const VerificationPhone = require("../../models/verification_phone");

// Апи для просмотра высланных кодов

exports.getVerificationPhones = (req, res, next) => {
    VerificationPhone.find().exec(function(err, verificationPhones){
        return verificationPhones;
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            "error": err
        });
    })
}
