const mogoose = require("mongoose")

const connectDB = async() => {
    try{
        await mogoose.connect("mongodb+srv://admin_piri:1at8P5CPT6J2u9pf@farmsyai.gmazl.mongodb.net/")
        .then(console.log("db connect"));
        
    }
    catch(error){
        console.log(error.message)

    }
}

module.exports = connectDB