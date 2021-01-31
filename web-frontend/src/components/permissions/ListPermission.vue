<template>
  <Dashboard title="Permissions">
    <div class="row">
      <router-link :to="newPermission">
        <b-button variant="primary" class="ml-2 mb-2">+ New</b-button>
      </router-link>
      <b-table striped hover class="text-center" :items="items"></b-table>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from "../template/Dashboard";
import ROUTES from "../../constants/Routes";
import PermissionService from "../../services/PermissionService";

const permissionService = new PermissionService();

export default {
  name: "ListPermission",
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
    const items = await permissionService.getAll();
    this.items = items;
  }
};
</script>

<style>
</style>
