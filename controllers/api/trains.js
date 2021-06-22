const Train = require("../../models/train");

// Апи для тренировок

exports.getTrains = (req, res, next) => {
    Train.find().exec(function(err, trains){
        return trains;
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            "error": err
        });
    })
}
