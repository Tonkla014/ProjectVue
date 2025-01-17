<template>
    <div>
        <Bar/>
    </div>
    <div>
        <div class="row">
            <div class="col-4">
                <div class="card"> <BarChart/></div>
            </div>
            <div class="col-4">
                <div class="card"> <BarChart/></div>
            </div>
            <div class="col-4">
                <div class="card"> <BarChart/></div>
            </div>
        </div>
    </div>
</template>
<script>
import BarChart from "../components/chart/ChartBar.vue"
import Bar from "../components/bar.vue";
// import Chart from "../components/chart/Chart.js";
export default {
    name:"Dashboard",
    data() {

    },
    components : {Bar,BarChart}
}
</script>
<style lang="">
    
</style>