const mongoose = require('mongoose');

module.exports =  mongoose.connect("mongodb://localhost:27017/RegistratioN").then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log(err);
})

