const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profileImage : {
        type : String,
        default : 'https://st3.depositphotos.com/19428878/36416/v/450/depositphotos_364169666-stock-illustration-default-avatar-profile-icon-vector.jpg'
    }
} , {timestamps : true});

const User = mongoose.model('User' , userSchema);
module.exports = User;
