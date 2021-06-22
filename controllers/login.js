const Book = require("../models/book");
const AdminUser = require("../models/admin_user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {  
    res.render("login", {
        layout: false,
        csrfToken: req.csrfToken(),
    });
}

exports.postSignUp = (req, res, next) => {  
    var data = req.body;
    //
    AdminUser.findOne({username: data.username}).then(user => {        
        if(user){
            return res.json({
                error: "Такой пользователь уже существует!",
                status: 500           
            });
        }else{
            return bcrypt.hash(data.password, 5); // возможно нужно переделать            
        }
    }).then(hashedPassword => {
        const user = new AdminUser({
            company: data.company,
            username: data.username,
            password: hashedPassword
        });        
        return user.save();        
    }).then(result => {
        res.redirect("/admin-panel/login");
    }).catch(err => {
        console.log(err);
    });      
}

exports.postLogin = (req, res, next) => {  
    var data = req.body;
    //
    AdminUser.findOne({username: data.username}).populate("company").exec(function(err, user){                        
        if(!user){
            res.render("login", {
                error: "Неправильный логин или пароль!",
                layout: false,
            });
        }else{            
            bcrypt.compare(data.password, user.password).then(equal => {
                if(equal){
                    req.session.current_user = user;
                    req.session.current_company = user.company;
                    res.redirect("/admin-panel/");
                }else{
                    res.render("login", {
                        error: "Неправильный логин или пароль!",
                        layout: false,                        
                    }); 
                }
            }).catch(err => {
                console.log(err);
            })
        }
    });  
}

exports.postLogout = (req, res, next) => {  
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/admin-panel/login");
    })
}
