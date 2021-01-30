<template>
    <div v-if="hasPermission">
      <slot></slot>
    </div>
</template>

<script>

export default {
  name: "Authorizator",
  props: {
    permissionToRender: String,
    permission: String
  },
  computed: {
    hasPermission() {
      return this.permissionToRender == this.permission;
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
