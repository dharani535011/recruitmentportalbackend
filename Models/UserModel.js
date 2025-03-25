const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    mail:{type:String,required:true},
    phone:{type:Number,required:true},
    skills:[{type:String,required:true}],
    experience:{type:String,required:true},
    education:{type:String,required:true},
    resume:{type:String,required:true},
    interviewers:[{type:String}],
    status:{type:String,defalut:"pending"},
    tech:{
        person:String,
        saw:String,
        rating:String,
        overall:String,
        feedback:String
    },
    hr:{
        person:String,
        saw:String,
        rating:String,
        overall:String,
        feedback:String
    },
    task:{
        person:String,
        saw:String,
        rating:String,
        overall:String,
        feedback:String
    }
})
const Applicants=mongoose.model("Applicants",userSchema,"Applicants")
module.exports=Applicants