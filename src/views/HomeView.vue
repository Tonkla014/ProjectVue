<template>
<div>
  <Bar/>
  <detail/>
  
</div>

</template>

<script>
import Bar from "../components/bar.vue";
import detail from "../components/home_detail.vue";
export default {
data() {
  return{
    start_text :'Piriyakorn Wetcharungsi',
    age : 0,

  }
},
components : {Bar,detail}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#btn{
   border-radius: 3px;
   background-color:#8BC34A ;
   font-size:  20px;
   text-transform: uppercase;
   padding-block: 20px;
   padding-inline: 35px;
}

</style>
