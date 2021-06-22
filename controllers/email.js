const sendEmail = require("../utils/send_email").sendEmail;
const User = require("../models/user");
const config = require("../utils/config");
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const rootDir = require("../utils/path");

exports.postSubmitReview = (req, res, next) => {  
    var text = req.body.text;
    var user_id = req.body.user;
    var callme = req.body.callme;

    if(!text || !user_id){
        return res.json({
            error: "Не передан один из параметров: text, user",
            status: 500           
        });
    }

    User.findById(user_id).exec(function(err, user){
        if(err){
            return res.json({
                error: "User с таким id не найден",
                status: 500           
            }); 
        }
        var message = "";
        var subject = "";
        if(callme){
            message = `
                Позвоните мне<br>
                Телефон: ${user.phone}<br>
                Имя: ${user.name}<br>
                Сообщение: ${text}<br>
            `;
            subject = `${user.phone}, ${user.name} позвонить`;
        }else{
            message = `
                Отзыв<br>
                Телефон: ${user.phone}<br>
                Имя: ${user.name}<br>
                Сообщение: ${text}<br>
            `;
            subject = `${user.phone}, ${user.name} отзыв`;
        }
        sendEmail(config.EMAIL_HOST_USER, subject, message);
        return res.json({
            success: true,
            status: 200           
        });
    }).catch(err => {
        console.log(err);
    });   
}

exports.postSubmitForm = (req, res, next) => {  
    var clubName = req.body.club_name;
    var description = req.body.description;
    var city = req.body.city;
    var hasOptionalServices = req.body.has_optional_services;
    if(hasOptionalServices === "on"){
        hasOptionalServices = "Да";
    }else{
        hasOptionalServices = "Нет";
    }
    var optionalServices = req.body.optional_services;
    var phone = req.body.phone;
    var email = req.body.email;

    var mail_subject = "Заявка на регистрацию клуба";

    var source = fs.readFileSync(path.join(rootDir, "views", 'submit_form_message.hbs'), 'utf8');
    var template = handlebars.compile(source);
    var message = template({
        club_name: clubName,
        description: description,
        city: city,
        has_optional_services: hasOptionalServices,
        optional_services: optionalServices,
        phone: phone,
        email: email,
    })
    
    sendEmail(config.EMAIL_HOST_USER, mail_subject, message);
    return res.json({
        success: true,
        status: 200           
    });    
}