const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    latitude: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    longiude: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    rating: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    qr_url: {
        type: String,
        required: true,
    },
    contacts: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    days: [
        {
            type: Schema.Types.ObjectId,
            ref: "Schedule",
            required: false,
        }
    ],
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: "ServiceCategory",   
        }
    ]
});

module.exports = mongoose.model("Company", CompanySchema);