const Company = require("../models/company");

exports.getSettings = (req, res, next) => {  
    res.render("settings", {
        "settingspage": true,
    });
}