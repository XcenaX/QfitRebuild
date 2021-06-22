const Book = require("../../models/book");

// Апи для броней

exports.getBooks = (req, res, next) => {
    Book.find().exec(function(err, books){
        return books;
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            "error": err
        });
    })
}

exports.getBookById = (req, res, next) => {
    var id = req.body.id;
    Book.findById(id).exec(function(err, book){
        return book;
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            "error": err,
        });
    });
}