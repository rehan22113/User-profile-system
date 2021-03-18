const mongoose = require("mongoose");


const structre = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    birth:{
        type:Date,
        required:true,
        unique:true
    },
    Gender:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    }
})


const model = new mongoose.model("collection",structre);

module.exports= model;