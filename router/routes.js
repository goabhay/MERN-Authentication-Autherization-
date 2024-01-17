const express = require('express');
const router = express.Router();
const empModel = require('../models/registers.js');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth.js')

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/register', (req, res) => {
    res.render('registration');
});

router.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        if (password === cpassword) {
            const registerEmployee = new empModel({
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                email: req.body.email,
                gender: req.body.gender,
                age: req.body.age,
                phone: req.body.phone,
                password: req.body.password,
                cnfpassword: req.body.confirmPassword
            });

            const token = await registerEmployee.generateAuthToken();
           
            console.log("TOKEN:",token);

            const registered = await registerEmployee.save();
            console.log(registered);
            res.cookie('jwt', token);
            
            res.status(201).render('home');
        } else {
            res.send("Passwords do not match");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await empModel.findOne({ email });
        const pwdMatch = await bcrypt.compare(password,user.password);

        const token = await user.generateAuthToken();   // generating token for the user
        res.cookie("jwt",token);
        console.log(`cookies:-${req.cookies.jwt}`)
        if (pwdMatch) {
            
            res.render('home');
        } else {
            res.send('Invalid email or password');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});


router.get('/logout',(req,res)=>{
    res.render('home');
})

router.get('/dashboard',auth,(req,res)=>{
    res.render('dashboard');
    console.log("cookie:-",req.cookies.jwt);
})

module.exports = router;
