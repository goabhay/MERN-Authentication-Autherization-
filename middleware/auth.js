const jwt = require('jsonwebtoken');
const register = require('../models/registers');

const auth = async (req,res,next)=>{      // if using a middleware 

    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
        console.log(verifyUser);
        next();
        
    }
    catch(error){
        res.redirect('/login');
        console.log('there is an error')
    }
}

module.exports = auth;