const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    day: {
        type: Number,
        required: true,        
    },
    timelines: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Timeline",
        }
    ],
});

// Методы

ScheduleSchema.methods.getCuttedName = function(){
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

ScheduleSchema.methods.getFullname  = function(){
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

module.exports = mongoose.model("Schedule", ScheduleSchema);