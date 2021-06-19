const Book = require("../models/book");

exports.getBooks = (req, res, next) => {  
    Book.find().then(books => {
        console.log(books);
        res.render("books", {
            "bookspage": true,
            "books": books,
        });
    }).catch(err => {
        console.log(err);
    });
}