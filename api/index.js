const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// import routes
const authRoute = require('./routes/authRoute');


// node configurations
const app = express();
require('dotenv').config();


// middlewares
app.use(express.json());
app.use(cors());


// database connection
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.log('Datbase connected failed :' , error);
    })

app.listen(process.env.PORT, () => {
    console.log('App is running on PORT' , process.env.PORT);
});

// api endpoints
app.use('/api/auth' , authRoute);


// globle error
app.use ((err , req , res , next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
});





