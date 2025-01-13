const mogoose = require("mongoose")

const connectDB = async() => {
    try{
        await mogoose.connect("mongodb+srv://admin_piri:d0X4qkV4xQYB7XB4@farmsyai.gmazl.mongodb.net/")
        .then(console.log("db connect"));
        
    }
    catch(error){
        console.log(error.message)

    }
}

module.exports = connectDB