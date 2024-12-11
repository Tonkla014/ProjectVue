const mongoose = require("mongoose");
const {Schema} = mongoose;

const category = new Schema({
    categories:{
        type: [], 
        require: true
    },
    select:{
        type: Number,
        require:false
    }
});

module.exports = mongoose.model('category' , category);

