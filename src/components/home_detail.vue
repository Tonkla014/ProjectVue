<template>

  <div class="row responsive">
    <div class="detail_1">
      <div class="col-12">
        <div class="h_step1">
          <div class="t_st fw-bold">WELCOME TO FARMYAI</div>
        </div>
      </div>
    </div>
    <div class="detail_2">
      <div class="container-xxl">
        <div class="row">
          <div class="col-12 col-xl-12">
            <!-- Navbar Section -->
            <div class="row">
              <div class="navbar navbar-expand-lg mt-1">
                <div class="container-fluid">
                  <div class="collapse navbar-collapse">
                    <div class="navbar-nav">
                      <div class="nav-item p-1">
                        <div class="card-detail shadow-sm btn btn-light" @click="item_add(true)">
                          <i class="bi bi-plus-circle m-2"></i>
                          เพิ่มสินค้า
                        </div>
                      </div>
                      <div class="nav-item p-1">
                        <div class="card-detail shadow-sm btn btn-light">สินค้าแนะนำ</div>
                      </div>
                      <div class="nav-item p-1">
                        <div class="card-detail shadow-sm btn btn-light">ข้อมูลแนะนำ</div>
                      </div>
                      <div class="nav-item p-1">
                        <div class="card-detail shadow-sm btn btn-light">ติดต่อเรา</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Filter and Content Section -->
            <div class="row">
              <div class="col-xs-12 col-sm-3 col-xl-3 filter-section">
                <filter_data :mode="mode_filter" />
              </div>
              <div class="col-xs-12 col-sm-9 col-xl-9 content-section">
                <div class="row row-cols-1 row-cols-md-4 g-4">
                  <div v-for="item in products" :key="item._id" class="col d-flex justify-content-center ">
                    <div class="card card-item">
                      <!-- dropdown ของไอเทม -->
                      <div class="dropdown">
                        <button type="button" class="icon-item btn btn-light" id="dropdownMenuButton1"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="bi bi-list"></i>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><a v-on:click="item_edit(item)" class="dropdown-item" type="button"><i
                                class="bi bi-pencil-fill me-2" style="color:cornflowerblue;"></i> แก้ไข </a></li>
                          <!-- <li><a class="dropdown-item" type="button"><i class="bi bi-eye-slash-fill me-2"
                                style="color: darkgrey;"></i>ซ่อน</a></li> -->
                          <li><a v-on:click="item_delead(item)" class="dropdown-item" type="button"><i
                                class="bi bi-trash3-fill me-2" style="color:crimson"></i>ลบ</a></li>
                        </ul>
                      </div>


                      <!-- <img v-for="pic in splitedList(item.p_image)"  :src="'/backend_api/picture/'+pic" class="card-img-top" alt="..."> -->
                      <div :id="'carouselExampleIndicators' + item._id" class="carousel slide">
                        <div class="carousel-inner">
                          <div v-for="pic in splitedList(item.p_image)" class="carousel-item active">
                            <img :src="'/backend_api/picture/' + pic" class="d-block w-100 imgitems">
                          </div>
                        </div>
                        <button class="carousel-control-prev d-flex" type="button"
                          :data-bs-target="'#carouselExampleIndicators' + item._id" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next d-flex" type="button"
                          :data-bs-target="'#carouselExampleIndicators' + item._id" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                        </button>
                      </div>
                      <div class="card-body">
                        <p class="card-text">
                          {{ item.p_name }}
                          <br>
                          {{ item.p_price }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Section -->
    <div v-if="modal_action" class="modal-overlay " @click.self="close">
      <div class="modal-content">
        <div style="text-align: end;">
          <button type="button" class="btn-close" @click="modal_action = false"></button>
        </div>

        <product_add @callback_data="call_productsadd" :mode_actionitem="mode_actionitem" :item_detail="data_detail" />


      </div>
    </div>
  </div>
 
</template>


<script>

import axios from "axios";
import { ref } from 'vue'
import product_add from "../components/product_add.vue";
import filter_data from "../components/filterproduct.vue"
import { data_products } from "../model/porductadd"
// import { echo } from 'shelljs';

export default {
  name: 'home_detail',
  data() {
    return {
      modal_action: false,
      testcall: null,
      mode_filter: "home",
      mode_actionitem: "",
      data_detail: [],
      products: data_products
    }

  },
  created() {
    this.itemshop();

  },
  methods: {
    async itemshop() {
      try {
        const response = await axios.get("http://localhost:3000/api/product");
        this.products = response.data
        //console.log(this.products)
      } catch (error) {
        console.log(error);
      }
    },
    item_add(data) {
      // alert("function done")
      this.mode_actionitem = "add"
      this.modal_action = true;
    }, item_edit(data) {
      this.data_detail = data
      this.mode_actionitem = "edit"
      this.modal_action = true;
    },
    async item_delead(data) {
      try{
      const jsData = JSON.stringify(data)
      // เพิ่มข้อมูลทั่วไปลงใน FormData
      
      const config = {
        headers: {
           'Content-Type': 'application/json'
        } 
      };
      let apiURL = 'http://localhost:3000/api/ItemDelead';
      const response = await axios.post(apiURL, jsData,config);
      
        this.$swal('ลบสำเร็จ')
        await this.itemshop()
    
     
    }catch{
      console.error('Error:', error);
      this.$swal('เกิดข้อผิดพลาด');
    }
    },
    call_productsadd(data) {

      this.modal_action = data;
      // console.log(data)


    },
    splitedList(imageString) {
      if (!imageString) return []; // Handle empty or null string
      return imageString.split("||").filter(img => img.trim() !== "");
      // Remove any empty strings caused by trailing `||`
    }
  }, components: { product_add, filter_data }


}

function test(message) {
  alert(message);
}

</script>
