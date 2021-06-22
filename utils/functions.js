const User = require("../models/user");

randomString = function(length){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

randomNumber = function(length){
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

isUserUnique = function(email, phone){
  User.find({$or:[ {'email':email}, {'phone':phone} ]}).exec(function(err, users){
      if(users.length > 0){
        return false;
      }
      return true;
  }).catch(err => {
    console.log(err);
    return false;
  });
};

module.exports.randomString = randomString;
module.exports.randomNumber = randomNumber;
module.exports.isUserUnique = isUserUnique;