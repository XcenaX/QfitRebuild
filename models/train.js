const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrainSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    company_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Company",
    },
    start_time: {
        type: Date,
        required: true,
    },
    finished: {
        type: Boolean,
        required: true,
    },
    minutes: {
        type: Number,
        required: false,
    }
});

module.exports = mongoose.model("Train", TrainSchema);