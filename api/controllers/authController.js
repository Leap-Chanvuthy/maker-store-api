const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error');


const signup =  (async(req , res , next) => {
    const { username , email , password} = req.body;
    if (!username || !email || !password || username == '' || email == '' , password == ''){
        next(errorHandler(400 , 'Please fill all in required fileds'));
    }

    try {        
        const hashedPassword = await bcrypt.hash (password , 10);
        const newUser = new User({username , email , password : hashedPassword});
        await newUser.save();
        res.json({'message' : 'user signed up successfully !'});
    }
    catch (error){
        next(error);
    }
}) 

module.exports = {signup};