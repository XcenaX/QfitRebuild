const Company = require("../../models/company");

// Апи для компаний

exports.getCompanies = (req, res, next) => {
    Company.find().exec(function(err, companies){
        return companies;
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            "error": err
        });
    })
}

exports.getCompanyById = (req, res, next) => {
    var id = req.body.id;
    Company.findById(id).exec(function(err, company){
        return company;
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            "error": err,
        });
    });
}