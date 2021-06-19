const mongoose = require("mongoose");
const Train = require("./train");
const randomString = require("../utils/functions").randomString;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    second_name: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    ref_code: {
        type: String,
        required: false
    }
});

// Методы

UserSchema.methods.isCurrentlyTraining = function(){
    return Train.find({user_id: this._id, finished: false}).exec(function (err, trains) {
        var count = trains.length;
        if(count == 0) return false;
        return true;
    });
};

UserSchema.methods.currentTrain = function(){
    return Train.findOne({user_id: this._id, finished: false}).exec(function (err, train) {
        if(err){
            console.log(err);
            return {
                "error": err
            }
        }
        return {
            "transaction_id": this.transaction_id,
            "start_time": this.start_time,
            "company": this.company_id,
        }
    });
};

UserSchema.methods.generateRefCode = function(){ // Потом нужно добавить проверку на уникальность реф кода
    this.ref_code = randomString();
    this.save();
};

UserSchema.methods.trainsCount = function(){
    return Train.find({user_id: this._id, finished: true}).exec(function (err, trains) {
        return trains.length;        
    });
};

UserSchema.methods.avarageTrainTime = function(){
    return Train.find({user_id: this._id, finished: true}).exec(function (err, trains) {
        var trains_count = trains.length;
        var minutes = 0;
        for(var i = 0; i < trains_count; i++){
            minutes += trains[i].minutes;
        }
        return Math.floor(minutes/trains_count);
    });
};

UserSchema.methods.maxTrainTime = function(){
    return Train.find({user_id: this._id, finished: true}).exec(function (err, trains) {
        var max_time = trains[0].minutes;
        for(var i = 1; i < trains.length; i++){
            if(max_time < trains[i].minutes){
                max_time = trains[i].minutes;
            }
        }
        return max_time;
    });
};

UserSchema.methods.mostVisitedClub = function(){
    // Нужно сделать
};


module.exports = mongoose.model("User", UserSchema);