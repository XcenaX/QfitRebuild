const mongoose = require("mongoose");
const Company = require("./company");

const Schema = mongoose.Schema;

const ServiceCategorySchema = new Schema({
    name: {
        type: String,
        required: true,        
    },
    image: {
        type: String,
        required: false
    },
});

// Методы

ServiceCategorySchema.methods.trainsCount = function(){
    return Company.find({tags: this.name}).exec(function(err, companies){
        return companies.length;
    });
}

module.exports = mongoose.model("ServiceCategory", ServiceCategorySchema);