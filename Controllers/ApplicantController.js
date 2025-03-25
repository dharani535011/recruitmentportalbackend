const Applicants = require("../Models/UserModel")
const multer=require("multer")
const path=require("path")
const fs=require("fs")
const nodemailer=require("nodemailer")
const { MAILPASS } = require("../Config")

// CREATE THE FOLDER IF NOT EXSISTS

const uploaddir=path.join(__dirname,"../uploads")
if(!fs.existsSync(uploaddir)){
    fs.mkdirSync(uploaddir,{recursive:true})
}

// CREATE THE MULTERDISKSTORAGE

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploaddir)
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})

// CHECK THE FILE WHETHER PDF or NOT

const filefilter=(req,file,cb)=>{
    if(file.mimetype==="application/pdf"){
        cb(null,true)
    }else{
        cb(new Error("only PDF files are allowed"),false)
    }
}

// EXECUTE THE MULTER

const upload=multer({storage:storage,fileFilter:filefilter})


// Applicants Controller
const Applicant={
    detialstore:async(req,res)=>{
        const {name,mail,phone,education,experience,skills}=req.body
               
        try {
             if(!name||!mail||!phone||!education||!experience||!skills||!req.file.path){
                 return res.send({message:"value is missing, including resume PDF! also needed"})
             }
             const isUser=await Applicants.findOne({mail})
             if(isUser){
                return res.send({message:"User already registered"})
             }
             const saveUser=new Applicants({name,mail,phone,education,experience,skills:skills.split(","),resume:req.file.path})
             await saveUser.save()
            res.send({message:"Applicant Registered"})
        } catch (error) {
            res.send({message:error.message})
        }
    },
    // SENDING MAIL AND ALOCATING THE INTERVIEWERS
    asigninterviewer: async (req, res) => {
        const { interviewers, appMail } = req.body
        try {
            // Validate that exactly 3 interviewers are selected
            if (!Array.isArray(interviewers) || interviewers.length !== 3) {
                return res.send({ message: "Select three interviewers" })
            }
    
            // Check if applicant exists
            const isUser = await Applicants.findOne({ mail: appMail })
            if (!isUser) {
                return res.send({ message: "Applicant is not found" })
            }
    
            // Save interviewers in the database
            isUser.interviewers = interviewers
            await isUser.save()
    
            // Send emails to interviewers
            const emailPromises = interviewers.map((val) => {  // ✅ Use a new variable instead of reassigning "interviewers"
                const transport = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "dharani535011@gmail.com",
                        pass: MAILPASS,  
                    },
                })
    
                return transport.sendMail({
                    from: "dharani535011@gmail.com",
                    to: val,
                    subject: "Regarding Interview",
                    text: `You are scheduled for an interview:
                    Please provide feedback for the applicant: ${appMail}.
                    After the interview,
                    Use this link: https://recruitment-portal-task.netlify.app/fb
                    `,
                })
            })
    
            // Wait for all emails to be sent before responding
            await Promise.all(emailPromises)
    
            res.send({ message: "Interviewers allocated and emails sent successfully" })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    // SENDING THE APPLICANT REVIEWS
    givereview:async(req,res)=>{
        const {applicantMail,interviewerMail,feedback,overall,rating,saw}=req.body
        try {
            if(!applicantMail||!interviewerMail||!feedback||!overall||!rating||!saw){
                return res.send({message:"value is missing"})
            }
            const isUser=await Applicants.findOne({mail:applicantMail})
            if (!isUser) {
                return res.send({ message: "Applicant is not found" })
            }
            const isInterviewed=isUser.interviewers.find((val)=>val==interviewerMail)
            if (isInterviewed) {
                if(isInterviewed=="jhon@gmail.com"||isInterviewed=="vinoth@gmail.com"){
                    if(!isUser.hr.person){
                        isUser.hr.person=interviewerMail.split("@")[0]
                        isUser.hr.feedback=feedback
                        isUser.hr.overall=overall
                        isUser.hr.rating=rating
                        isUser.hr.saw=saw
                    }else{
                        return res.send({message:"already review given"})
                    }
                }
                if(isInterviewed=="sam@gmail.com"||isInterviewed=="ramanan@gmail.com"){
                    if(!isUser.tech.person){
                        isUser.tech.person=interviewerMail.split("@")[0]
                        isUser.tech.feedback=feedback
                        isUser.tech.overall=overall
                        isUser.tech.rating=rating
                        isUser.tech.saw=saw
                    }else{
                        return res.send({message:"already review given"})
                    }
                }
                if(isInterviewed=="umarali@gmail.com"||isInterviewed=="joseph@gmail.com"){
                    if(!isUser.task.person){
                        isUser.task.person=interviewerMail.split("@")[0]
                        isUser.task.feedback=feedback
                        isUser.task.overall=overall
                        isUser.task.rating=rating
                        isUser.task.saw=saw
                    }else{
                        return res.send({message:"already review given"})
                    }
                }
                
            }
            await isUser.save()
            return res.send({ message: "thanks for the review" })
        } catch (error) {
            res.send({message:error.message})
        }
    },
    // APPLICANT StATUS IS CHANGED
    changestatus:async(req,res)=>{
        const {mail,status}=req.body
        try {
            const isUser=await Applicants.findOne({mail})
            if (!isUser) {
                return res.send({ message: "Applicant is not found" })
            }
            isUser.status=status
            await isUser.save()
            res.send({message:"applicant status is updated"})
        } catch (error) {
            res.send({message:error.message})
        }
    }
    
    
}
module.exports={Applicant,upload}