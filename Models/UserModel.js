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
    status:{type:String,default:"pending"},
    count:{type:Number,default:0},
    tech:{
        person:{type:String,default:""},
        saw:{type:String,default:""},
        rating:{type:String,default:""},
        overall:{type:String,default:""},
        feedback:{type:String,default:""}
    },
    hr:{
        person:{type:String,default:""},
        saw:{type:String,default:""},
        rating:{type:String,default:""},
        overall:{type:String,default:""},
        feedback:{type:String,default:""}
    },
    task:{
        person:{type:String,default:""},
        saw:{type:String,default:""},
        rating:{type:String,default:""},
        overall:{type:String,default:""},
        feedback:{type:String,default:""}
    }
})
const Applicants=mongoose.model("Applicants",userSchema,"Applicants")
module.exports=Applicants