<template>
  <Dashboard title="Dashboard">
    <div class="row">
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from "../template/Dashboard";

export default {
  name: "DashboardPage",
  components: {
    Dashboard,
  },
  data() {
    return {
      qtdTodos: 0,
      qtdInProgressing: 0,
      qtdDone: 0
    };
  },
  async beforeMount() {
  },

  mounted() {
    this.$toastr.s("User authenticated success!!!");
  } 
};
</script>

<style>
</style>
