// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)

app.use(router)
app.use(VueSweetalert2)
app.use(VueApexCharts);

app.mount('#app')
    