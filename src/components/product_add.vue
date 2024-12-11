<template>
    <div class="mt-3 mb-3 ">
        <div class="row">
            <div class="col" style="text-align: justify;">
                <div class="md-3">
                    <label for="cal1" class="form-label">ชื่อสินค้า</label>
                    <input type="text" class="form-control" id="cal1" v-model="local_p.p_name"
                        aria-describedby="inputGroupPrepend">
                    <div class="mt-1">
                        <h6 class="textalertinput " v-if="!local_p.p_name">
                            กรุณากรอกชื่อสินค้า
                        </h6>
                    </div>

                </div>
                <div class="mb-3">
                    <label for="cal2" class="form-label">จำนวน</label>
                    <input type="number" class="form-control" id="cal2" v-model="local_p.p_count">
                    <div class="mt-1">
                        <h6 class="textalertinput " v-if="!local_p.p_count">
                            กรุณากรอกจำนวน
                        </h6>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="cal3" class="form-label">ราคา/ชิ้น</label>
                    <input type="number" class="form-control" id="cal3" v-model="local_p.p_price">
                    <div class="mt-1">
                        <h6 class="textalertinput mt-1" v-if="!local_p.p_price">
                            กรุณากรอกราคา
                        </h6>
                    </div>
                </div>
            </div>
            <div class="col" style="text-align: justify;">
                <label for="cal1" class="form-label">ประเภท</label>
                <div :style="{'min-height': heightselect +'px'}">
                  <h6  v-if="edit_ca&&mode_actionitem=='edit'"> 
                    <span class="badge text-bg-light"> 
                    <button v-on:click="cat_edit()" type="button" class="btn-close" ></button>
                   </span>
                   {{ local_p.p_categories }}</h6>
                    <filter_data v-if="!edit_ca||mode_actionitem=='add'" :mode="mode_filter" @CB_category_add="category_add" />

                </div>
                <div class="mb-3">
                    <label for="cal4" class="form-label">รายละเอียด</label>
                    <textarea type="text" class="form-control" id="cal4" v-model="local_p.p_detail"></textarea>
                </div>
            </div>
            <div class="mb-3">
                <a>อัปโหลดหลายรูปภาพ</a>
                <br>
                <input type="file" @change="onFilesChange" accept="image/*" multiple />
                <h6 class="textalertinput mt-1" v-if="!local_p.p_image">
                    กรุณาอัพโหลดรูปภาพ
                </h6>
                <div v-if="previewImages.length > 0">
                    <h6>ตัวอย่างรูปภาพ:</h6>
                    <div style="display: flex; flex-wrap: wrap;">
                        <div v-for="(image, index) in previewImages" :key="index" style="margin: 5px;">
                            <img :src="image" alt="Preview"
                                style="max-width: 100px; border: 1px solid #ddd; border-radius: 5px;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <button v-if="mode_actionitem == 'add'" :disabled="isFormInvalid" @click="save_modal" class="btn btn-primary"
            style="height: 35px; width:100%">บันทึก
        </button>
        <button  v-if="mode_actionitem == 'edit'" :disabled="isFormInvalid" @click="updateitem" class="btn btn-warning"
            style="height: 35px; width:100%">ยืนยันแก้ไข
        </button>

    </div>

</template>

<script>

import axios from "axios";
import { data_products } from "../model/porductadd"
import filter_data from "../components/filterproduct.vue"

export default {
    name: 'product_add',
    props: {
        item_detail: {
            type: { ...data_products }, //mode home , adddata
            required: false
        },
        mode_actionitem:{
            type:String,
            require: true
        }
    },
    data() {
        return {
            local_p: { ...data_products },
            selectedFiles: [],     // เก็บไฟล์ที่ผู้ใช้เลือก
            previewImages: [],      // เก็บ URL สำหรับแสดงตัวอย่างรูปภาพ
            name_image: "",
            modal_action: null,
            mode_filter: "add",
            edit_ca:true,
            heightselect: 0,
        };

    },
    created() {
         this.CheckMode();
    }
    ,
    methods: {
        async save_modal() {
            // this.modal_action = false;
            await this.submitdata(this.local_p);
            this.$emit("callback_data", this.modal_action);
        },
        async updateitem() {
            // this.modal_action = false;
            await this.Update(this.local_p);
            this.$emit("callback_data", this.modal_action);
        },
        async submitdata(data) {
            const formData = new FormData();
            // เพิ่มข้อมูลทั่วไปลงใน FormData
            formData.append('model', JSON.stringify(data));
            // เพิ่มรูปภาพทั้งหมดลงใน FormData
            if (this.selectedFiles && this.selectedFiles.length > 0) {
                this.selectedFiles.forEach((file, index) => {
                    formData.append('images', file);  // ใช้ชื่อ 'images' สำหรับไฟล์ทั้งหมด
                });
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            let apiURL = 'http://localhost:3000/api/formsstore';
            const response = await axios.post(apiURL, formData, config);

            this.modal_action = false;
            // console.log('Upload success:', response.data);

        },
        async Update(data){
        const formData = new FormData();
            // เพิ่มข้อมูลทั่วไปลงใน FormData
            formData.append('model', JSON.stringify(data));
            // เพิ่มรูปภาพทั้งหมดลงใน FormData
            if (this.selectedFiles && this.selectedFiles.length > 0) {
                this.selectedFiles.forEach((file, index) => {
                    formData.append('images', file);  // ใช้ชื่อ 'images' สำหรับไฟล์ทั้งหมด
                });
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            let apiURL = 'http://localhost:3000/api/ItemUpdate';
            const response = await axios.put(apiURL, formData, config);
            this.modal_action = false;
           
            },
        category_add(data) {
            // console.log(data);
            this.local_p.p_categories = data;
        },
        onFilesChange(event) {
            const files = event.target.files;
            this.selectedFiles = Array.from(files); // แปลง FileList เป็น array
            this.selectedFiles_out = this.selectedFiles;
            this.previewImages = []; // รีเซ็ตตัวอย่างรูปภาพเก่า
            this.name_image = "";
            // ใช้ FileReader เพื่อสร้าง preview ของแต่ละรูปภาพ
            this.selectedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImages.push(e.target.result);
                };
                reader.readAsDataURL(file);
                this.name_image += file.name + "||";
            });

            this.local_p.p_image = this.name_image;
        },
        category_add(data) {
            // console.log(data);
            this.local_p.p_categories = data;
        },
        onFilesChange(event) {
            const files = event.target.files;
            this.selectedFiles = Array.from(files); // แปลง FileList เป็น array
            this.selectedFiles_out = this.selectedFiles;
            this.previewImages = []; // รีเซ็ตตัวอย่างรูปภาพเก่า
            this.name_image = "";
            // ใช้ FileReader เพื่อสร้าง preview ของแต่ละรูปภาพ
            this.selectedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImages.push(e.target.result);
                };
                reader.readAsDataURL(file);
                this.name_image += file.name + "||";
            });

            this.local_p.p_image = this.name_image;
        },
        CheckMode(){
         if (this.mode_actionitem == "view" || this.mode_actionitem == "edit"){
             this.local_p = this.item_detail;
             this.heightselect = 0;
         }
        },
        cat_edit(){
            this.edit_ca = false
            this.heightselect = 100;
        }

    },
    computed: {
        isFormInvalid() {
            // ตรวจสอบว่ามีฟิลด์ใดใน formData ที่เป็นค่าว่างหรือไม่
            return !this.local_p.p_name || !this.local_p.p_price || !this.local_p.p_image || !this.local_p.p_count || !this.local_p.p_categories;

        },

    }, components: { filter_data }
}



</script>
