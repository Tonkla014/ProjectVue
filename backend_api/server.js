// route.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectdb = require("./dbmain");
const app = express();
const multer = require('multer');
const path = require('path');

app.use(cors()); // เปิดให้เรียก API จากต่าง domain ได้
app.use(express.json());
const fs = require("fs")
const product = require("./models/productmodel");
const category = require("./models/filtermodel");

connectdb();




// ตั้งค่า storage สำหรับ multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'picture/'); // ต้องสร้างโฟลเดอร์ uploads ก่อน
  }
  ,
  filename: (req, file, cb) => {
    // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/api/test2', (req, res) => {
  res.json({ human: "testkub", home: "tumnan" })
});


//v1
app.post('/api/test', async (req, res) => {

  try {

    req.body.p_datein = new Date();
    const newitem = new product(req.body);
    console.log(req.body);
    await newitem.save();
    res.status(201).json(newitem);

  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(req.body);
  }

});




// API v2 endpoint รับข้อมูลและรูปภาพ
app.post('/api/formsstore', upload.array('images', 10), async (req, res) => {
  try {
    //แปลงข้อมูลเป็น json
    const newitem = new product(JSON.parse(req.body.model));
    newitem.p_datein = new Date()
    // console.log(newitem);
    // ข้อมูลไฟล์จะอยู่ใน req.files
    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      path: file.path
    }));

    // บันทึกข้อมูลลง database
    // ...
    await newitem.save();
    res.status(201).json({
      success: true,
      message: 'Upload successful',
      product: newitem,
      files: uploadedFiles
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving data',
      error: error.message
    });
  }
});

app.put('/api/ItemUpdate', upload.array('images', 10), async (req, res) => {
  try { 
    // console.log('test')
    //แปลงข้อมูลเป็น json
    const newitem = new product(JSON.parse(req.body.model));
    newitem.p_datein = new Date()
    // ข้อมูลไฟล์จะอยู่ใน req.files
    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      path: file.path
    }));
    // บันทึกข้อมูลลง database
    // ...
    await product.updateOne ({_id:newitem.id}, { $set: newitem })

    res.status(201).json({
      success: true,
      message: 'Upload successful',
      product: newitem,
      files: uploadedFiles
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving data',
      error: error.message
    });
  }
});

app.get('/api/filter', async (req, res) => {

  try {
    const data = await category.find({});
    // console.log(data)
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});

app.get('/api/product', async (req, res) => {

  try {
    const data = await product.find({});
    //  console.log(data)
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
});



app.post('/api/ItemDelead', async (req, res) => {
  try {
    const itemtarget =req.body;
   
    await product.deleteOne({_id:itemtarget._id});
    
    res.status(201).json({
      success: true,
      message: 'success delead',
      product: itemtarget
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error delead data',
      error: error.message
    });
  }
});


app.post('/api/filterData', async (req, res) => {
  try {
    const datafilter = req.body;
    const category = [];
    datafilter.selectbox.forEach(element => {
      if (element.select == true) {
        element.items.forEach(c => {
          if (c.select == true) {
            category.push(c.name);
          }
        });
      }
    });
    const query = {
      $or: [
        { p_name: datafilter.searchbox },
        { p_categories: { $in: category } }
      ]
    };
    data = await product.find(query);
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

app.use('/picture', express.static('C:/Users/piriy/farmsyai/backend_api/picture'));


// ตั้งค่าให้ server ทำงานที่ port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
