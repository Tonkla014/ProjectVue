// const mongoose = require("mongoose");
// const {Schema} = mongoose;

// const category = new Schema({
//     categories:{
//         type: [], 
//         require: true
//     },
//     select:{
//         type: Number,
//         require:false
//     }
// });

// // module.exports = mongoose.model('category' , category);

// module.exports = mongoose.model('category', category, 'category');


const mongoose = require('mongoose');
const filterSchema = new mongoose.Schema({
  categories: [String],
  select: Number
}, { collection: 'category' }); // ต้องกำหนด collection ให้ตรง

module.exports = mongoose.model('category', filterSchema);