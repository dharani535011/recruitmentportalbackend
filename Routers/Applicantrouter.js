const express=require("express")
const {Applicant,upload} = require("../Controllers/ApplicantController")
const ApplicantRouter=express.Router()
ApplicantRouter.post("/store-detials",upload.single("resume"),Applicant.detialstore)
ApplicantRouter.post("/asign-interviewer",Applicant.asigninterviewer)
ApplicantRouter.post("/review",Applicant.givereview)
ApplicantRouter.post("/changestatus",Applicant.changestatus)
ApplicantRouter.get("/allapplicants",Applicant.allaplicants)
module.exports=ApplicantRouter