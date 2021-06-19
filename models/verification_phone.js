const mongoose = require("mongoose");
const randomNumber = require("../utils/functions").randomNumber;

const Schema = mongoose.Schema;

const VerificationPhoneSchema = new Schema({
    phone: {
        type: String,
        required: true,        
    },
    code: {
        type: String,
        required: false,        
    },
});

// Методы

VerificationPhoneSchema.methods.generateCode = function(){
    this.code = randomNumber();
    this.save();
};

module.exports = mongoose.model("VerificationPhone", VerificationPhoneSchema);