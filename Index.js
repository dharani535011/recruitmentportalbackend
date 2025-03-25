const express=require("express")
const app=express()
const mongoose=require("mongoose")
const { MONGODB } = require("./Config")
const cors=require("cors")
const cookieparser=require("cookie-parser")
const ApplicantRouter = require("./Routers/Applicantrouter")

// MIDDLEWARES
// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }))

// implementing the cors
app.use(cors({
    origin:["http://localhost:5174/","https://recruitment-portal-task.netlify.app/"],
    credentials:true
}))
// implementing the body parser
app.use(express.json())
// implementing the cookieprser
app.use(cookieparser())
// implementing the server upload
app.use("/uploads",express.static("uploads"))
// Applicant midleware
app.use("/applicant",ApplicantRouter)




// CONNECTING DATABASE AND SERVER

mongoose.connect(MONGODB)
.then(()=>{
    console.log("DATABASE CONNECTED")
    app.listen(3000,()=>{
        console.log("SERVER CONNECTED")
    })
})