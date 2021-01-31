<template>
  <Dashboard title="Emails">
    <div class="row">
      <!-- <router-link :to="newPermission">
        <b-button variant="primary" class="ml-2 mb-2">+ New</b-button>
      </router-link>
      <b-table striped hover class="text-center" :items="items"></b-table> -->
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from "../template/Dashboard";
import ROUTES from "../../constants/Routes";

export default {
  name: "ListEmail",
  components: {
    Dashboard,
  },
  data() {
    return {
      newPermission: ROUTES.NEW_PERMISSION,
      items: [
        
        ]
    };
  },

  async mounted() {
  }
};
</script>

<style>
</style>
