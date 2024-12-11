<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<template>
  <div id="app">
    
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>


<script>
export default {
  name: 'App'
}
</script>


<style>
@import './assets/style_main.css';
#app {
  font-family: "Kanit", serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;

}
</style>
