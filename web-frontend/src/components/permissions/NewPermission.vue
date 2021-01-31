<template>
  <Dashboard title="New Permission">
    <div class="row">
      <div class="alert alert-danger col-md-12" v-if="errors.length > 0">
        <strong v-for="error in errors" :key="error">{{ error }}</strong>
      </div>
      <form @submit.prevent="save()" class="col-md-12">
        <div class="form-group">
          <label for="">Name:</label>
          <input type="text" v-model="name" @keyup="applyPattern()" class="form-control" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Save</button>&nbsp;
          <router-link :to="listPermission">
            <button class="btn btn-danger">Cancel</button>
          </router-link>
        </div>
      </form>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from "../template/Dashboard";
import PermissionService from "../../services/PermissionService";
import ROUTES from "../../constants/Routes";

const permissionService = new PermissionService();

export default {
  name: "ListPermission",
  components: {
    Dashboard,
  },
  data() {
    return {
      listPermission: ROUTES.PERMISSIONS,
      name: "",
      errors: [],
    };
  },
  methods: {
    applyPattern() {
      let name = this.name;
      name = name.toLowerCase();
      name = name.replace(/\s/g, "_");
      this.name = name;
    },

    cleanForm() {
      this.errors = [];
      this.name = "";
    },

    async save() {
      try {
        if (this.isValidData()) {
          await permissionService.create(this.name);
          this.cleanForm();
          this.$toastr.s("Permission created success.");
        }
      } catch (error) {
        const message = error.response.data.message;
        this.$toastr.e(message);
        this.cleanForm();
      }
    },
    isValidData() {
      let isValidData = true;
      if (this.name == null || this.name.toString().length == 0) {
        this.errors.push("Name is required.");
        isValidData = false;
      }

      return isValidData;
    },
  },
};
</script>

<style>
</style>
