exports.getSupport = (req, res, next) => {  
    res.render("support", {
        "supportpage": true,
    });
}