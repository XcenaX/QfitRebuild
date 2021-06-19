const Train = require("../models/train");

exports.getHistory = (req, res, next) => {  
    console.log(req.session.current_user);
    res.render("history", {
        "historypage": true,
    });
}