<template>
    <div v-if="hasPermission" class="col-md-12">
      <slot></slot>
    </div>
</template>

<script>
import AuthService from "../../services/AuthService";

const authService = new AuthService();

export default {
  name: "Authorizator",
  props: {
    permissionToRender: Array,
  },
  computed: {
    hasPermission() {
      return authService.hasPermissions(this.permissionToRender);
    }
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
