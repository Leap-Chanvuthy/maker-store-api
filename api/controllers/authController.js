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


const signin = (async (req , res , next) => {
    const {email , password} = req.body;
    if (!email || !password || email == '' || password == ''){
        next(errorHandler(400 ,  'Please fill all in required fields'));
    }

    try {
        const validUser = await User.findOne({email});
        if (!validUser){
            next(errorHandler(400 , 'Please enter a valid email'));
        }

        const validatePassword = await bcrypt.compareSync(password , validUser.password);
        if (!validatePassword){
            return next (errorHandler(400 , 'Please enter a correct password'));
        }

        const token = jwt.sign({id : validUser._id} , process.env.JWT_SECRET);
        const {password : pass , ...rest} = validUser._doc;
        res.status(200).cookie('access_token' , token , {httpOnly : true}).json(rest);
    }
    catch (error){
        next(errorHandler(error));
    }

});

module.exports = {signup , signin};