require("dotenv").config()
const MONGODB=process.env.mongodb
const MAILPASS=process.env.mailpass
module.exports={
    MONGODB,MAILPASS
}