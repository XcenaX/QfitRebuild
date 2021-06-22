const User = require("../../models/user");

// Апи для юзеров

exports.getUsers = (req, res, next) => {
    User.find().exec(function(err, users){
        return users;
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            "error": err
        });
    })
}
