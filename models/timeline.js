const mongoose = require("mongoose");
const Company = require("./company");
const Book = require("./book");

const Schema = mongoose.Schema;

const TimelineSchema = new Schema({
    company_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Company",
    },
    start_time: {
        type: String,
        required: true,
    },
    end_time: {
        type: String,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    limit_people: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

// Методы

TimelineSchema.methods.getCuttedName = function(){
    if(self.day == 0)
        return "Пн"
    if(self.day == 1)
        return "Вт"        
    if(self.day == 2)
        return "Ср" 
    if(self.day == 3)
        return "Чт"           
    if(self.day == 4)
        return "Пт"          
    if(self.day == 5)
        return "Сб"         
    if(self.day == 6)
        return "Вс"
    return ""
}

TimelineSchema.methods.getFullname  = function(){
    if(self.day == 0)
        return "Понедельник"
    if(self.day == 1)
        return "Вторник"        
    if(self.day == 2)
        return "Среда" 
    if(self.day == 3)
        return "Четверг"           
    if(self.day == 4)
        return "Пятница"          
    if(self.day == 5)
        return "Суббота"         
    if(self.day == 6)
        return "Воскресенье"
    return ""
}

TimelineSchema.methods.freePlaces = function(){ // Возможно придется переделать
    return Company.findById(this.company_id).exec(function(err, company){
        if(err){
            console.log(err);
            return null;
        }
        if(!company){
            return null;
        }
        return Book.find({vompany_id: company._id, start_time=this.start_time, end_time=this.end_time, day=this.day}).exec(function(err, books){
            return this.limit_people - books.length;
        });        
    });
}

module.exports = mongoose.model("Timeline", TimelineSchema);