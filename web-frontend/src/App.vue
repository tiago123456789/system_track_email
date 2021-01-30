<template>
  <!-- <Dashboard title="Dashboard"> -->
    <router-view></router-view>
  <!-- </Dashboard> -->
</template>

<script>
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import Dashboard from "./components/template/Dashboard.vue";

export default {
  name: "App",
  components: {
    // Dashboard
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
