const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanyImageSchema = new Schema({
    image: {
        type: String,
        required: true,        
    },
});

module.exports = mongoose.model("CompanyImage", CompanyImageSchema);