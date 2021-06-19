const Train = require("../models/train");

exports.getTrains = (req, res, next) => {  
    Train.find().then(trains => {
        console.log(trains);
        res.render("trains", {
            "mainpage": true,
            "trains": trains,
        });
    }).catch(err => {
        console.log(err);
    });
}