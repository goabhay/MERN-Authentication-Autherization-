const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import jwt module
require('dotenv').config();

// const empSchema = new mongoose.Schema({
//     firstname: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     lastname: {
//         type: String,
//         trim: true,
//     },
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//     },
//     tokens:[{
//         token:{
//             type:String,
//             required:true
//         }
//     }]
// })
const empSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cnfpassword: {
        type: String,
        required: true
    },
    tokens:[{
                token:{
                     type:String,
                     required:true
                 }
             }]
});

empSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log("Token not generated", err);
        throw err;
    }
};

empSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log(`pwd before hash: ${this.password}`);
        const hashpwd = await bcrypt.hash(this.password, 10);
        console.log(`pwd after hash : ${hashpwd}`);
        this.password = hashpwd;
        this.cnfpassword = hashpwd;
    }
    next();
});

const Employee = mongoose.model('Employee', empSchema);

module.exports = Employee;
