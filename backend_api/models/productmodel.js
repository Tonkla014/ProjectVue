const mongoose = require("mongoose");
const {Schema} = mongoose;

const productschema = new Schema({
    p_name: {
        type: String,
        require: true
    },
    p_count: {
        type: Number,
        require: true
    },
    p_price: { 
        type: Number,
        require: true
     },
    p_detail: { 
        type: String,
        require: true
     },
    p_image: { 
        type: String,
        require: false
     },
    p_datein: { 
        type: Date,
        require: false
     },
     p_categories: { 
        type: String,
        require: false
     }
});

module.exports = mongoose.model('Product' , productschema);

