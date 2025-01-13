<template>
  <div class="mt-1 mb-1">
    <div class="card card-filter " :class="{ 'p-0': check_add }">
      <div class="container">
        <form @submit.prevent="FilterActive" v-on:change="FilterActive">
          <div  v-if="mode_in == 'home'" class="d-flex" role="search">
          <input class="form-control me-2" type="search" v-model="filtermodel.searchbox" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
        </div>
        <!-- <div v-if="mode_in == 'home'" class="overflow-auto"style=" height: 170px;" > -->
        <div class="accordion mt-1" :style="{ 'overflow': check_overflow, height: check_height + 'px' }"
          id="accordionExample">
          <div v-for="cg in categories" :key="cg.category" class="accordion-item">
            <h2 class="accordion-header">
              <div class="input-group">
                <div class="input-group-text">
                  <input v-if="mode_in == 'home'" class="form-check-input mt-0" type="checkbox" :id="cg.select"
                    :value="cg.select" v-model="cg.select" v-on:change="toggleAll(cg)"
                    aria-label="Checkbox for following text input">
                </div>
                <button class="form-control accordion-button collapsed  p-1" type="button" data-bs-toggle="collapse"
                  :data-bs-target="'#' + cg.category + mode_in" aria-expanded="true" aria-controls="collapseOne">
                  {{ cg.category }}
                </button>
              </div>
            </h2>
            <div :id="cg.category + mode_in" class="accordion-collapse collapse close forntd_d_cat">
              <div class="accordion-body text-start">
                <div v-for="items in cg.items" :key="items.name" class="form-check">
                  <input class="form-check-input" type="checkbox" :id="items.name" :value="items.name"
                    v-model="items.select" v-on:change="toggledetail(items.name)">
                  <label class="form-check-label " :for="items.name">
                    {{ items.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>

      <!-- </div> -->

    </div>
  </div>

</template>

<script>
import axios from "axios";
import { categories } from "../model/productmodel"
import { filter } from "../model/productmodel"

export default {
  name: 'filter_item',
  props: {
    mode: {//โหมดทำงาน
      type: String, //mode home , adddata
      required: false
    }
    // ,
    // viewdata: { //ข้อมูลแสดง
    //   type: String,
    //   required: true
    // }
  },
  data() {
    return {
      datafilter: [],
      categories: categories,
      filtermodel:filter,
      selected: [],
      allSelected: false,
      indeterminate: false,
      mode_in: this.mode,
      check_overflow: this.mode === "add" ? "auto" : "visible",
      check_height: this.mode === "add" ? 170 : "none",
      check_add: this.mode === "add"

    };

  }
  , created() {
    this.get_filter()
  }
  ,
  methods: {

    async get_filter() {
      try {
        const response = await axios.get("http://localhost:3000/api/filter");
        this.datafilter = response.data;
        this.categories = this.datafilter[0].categories;
        // console.log(this.datafilter[0].categories);
        //  console.log(this.categories);
      } catch (error) {
        console.log(error);
      }
    },
    toggleAll(checked) {
      //  console.log(checked);
      if (checked.select == true) {
        const cat_filter = this.categories.filter(t => t.category == checked.category);
        cat_filter[0].items.forEach(item => {
          item.select = true;
          // console.log(this.categories);
        });
      } else if (checked.select == false) {
        const cat_filter = this.categories.filter(t => t.category == checked.category);
        cat_filter[0].items.forEach(item => {
          item.select = false;

        });
      }
    },
    toggledetail(checked) {

      ///เลือกได้ 1 ใน mode add
      if (this.mode == "add") {
        this.categories.forEach(item => {
          item.items.forEach(d => {
            if (d.select && checked != d.name) {
              d.select = false;
            }
          });
        });
        this.$emit("CB_category_add", checked); // use in ADDproduct
      }

    },
    FilterActive(){
        this.filtermodel.selectbox = this.categories
        this.$emit("CB_home", this.filtermodel);
    }

  },

  computed: {


  }

}

</script>
