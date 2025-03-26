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
    origin:true,
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
const port=3000 
mongoose.connect(MONGODB)
.then(()=>{
    console.log("DATABASE CONNECTED")
    app.listen(port,()=>{
        console.log("SERVER CONNECTED")
    })
})