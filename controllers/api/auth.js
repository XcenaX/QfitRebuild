const VerificationPhone = require("../../models/verification_phone");
const randomNumber = require("../../utils/functions").randomNumber;
const emailValidator = require("email-validator");
const phoneValidator = require('validate-phone-number-node-js');
const User = require("../../models/user");
const isUserUnique = require("../../utils/functions").isUserUnique;

// Апи авторизации и регистрации

exports.sendCode = (req, res, next) => {// Пока без смс
    var phone = req.body.phone;
    if(!phoneValidator.validate(phone)){
        return res.status(500).json({
            "error": "Неправильный номер телефона!"
        })
    }
    VerificationPhone.findOne({phone: phone}).exec(function(err, verificationPhone){
        if(verificationPhone){            
            verificationPhone.remove();            
        }
        var code = randomNumber(8);
        const newVerificationPhone = new VerificationPhone({
            phone: phone,
            code: code
        });
        newVerificationPhone.save();
        console.log("SMS sended"); // Здесь выслать код
        res.status(200).json({
            "success": true
        });
    }).catch(err => {
        console.log(err);
    });    
}

exports.checkCode = (req, res, next) => {
    var code = req.body.code;    
    var phone = req.body.phone;
    VerificationPhone.findOne({code: code, phone: phone}).exec(function(err, verificationPhone){
        if(!verificationPhone){                
            return res.status(500).json({
                "error": "Неправильный код!"
            })
        }
        verificationPhone.remove();
        User.findOne({phone: phone}).exec(function(err, user){ // Если юзер существует то вернуть токен и юзера
            if(user){
                return res.status(200).json({
                    "success": true,
                    "user": user,
                    "token": "TOKEN" // Здесь вернуть токен
                })
            } else{
                return res.status(200).json({
                    "success": true,                    
                })
            }
        }).catch(err => {
            console.log(err);
        });        
    }).catch(err => {
        console.log(err);
    });    
}

exports.register = (req, res, next) => {
    var email = req.body.email;
    var phone = req.body.phone;
    var name = req.body.name;
    var sex = req.body.sex;
    if(!emailValidator.validate(email)){
        return res.status(500).json({
            "error": "Некорректный email!"
        })
    }
    if(!validatePhoneNumber.validate(phone)){
        return res.status(500).json({
            "error": "Некорректный номер телефона!"
        })
    }
    if(!name){
        return res.status(500).json({
            "error": "Введите имя!"
        })
    }
    if(!sex){
        return res.status(500).json({
            "error": "Укажите ваш пол!"
        })
    }
    if(!isUserUnique(email, phone)){
        return res.status(500).json({
            "error": "Такой пользователь уже сущетсвует!"
        })
    }   
    var user = new User({
        name: name,
        phone: phone,
        email: email,
        sex: sex
    })
    user.save();
    return res.status(201).json({
        "success": true,
        "user": user,
        "token": "TOKEN", // Вернуть токен
    })
}