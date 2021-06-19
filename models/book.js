const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    company_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    timeline_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    book_date: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Book", BookSchema);