<template>
  <Dashboard title="New User">
    <div class="row">
      <form class="col-md-12" @submit.prevent="update()">
        <div class="form-group">
          <label for="">Username</label>
          <input type="text" v-model="user.username" class="form-control" />
        </div>
        <div class="form-group">
          <label for="">Email:</label>
          <input type="email" v-model="user.email" class="form-control" />
        </div>
        <div class="form-group">
          <label for="">Permissions:</label>
          <multiselect
            v-model="value"
            :options="options"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Pick some"
            label="name"
            track-by="name"
            :preselect-first="true"
          >
          </multiselect>
        </div>
        <div class="form-group">
          <button class="btn btn-primary">update</button>&nbsp;
          <router-link :to="listUserRoute" class="btn btn-danger">Cancel</router-link>
        </div>
      </form>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from "../template/Dashboard";
import Multiselect from "vue-multiselect";
import "../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

import PermissionService from "../../services/PermissionService";
import UserService from "../../services/UserService";
import ROUTES from '../../constants/Routes';

const permissionService = new PermissionService();
const userService = new UserService();

export default {
  name: "EditUser",
  components: {
    Dashboard,
    Multiselect,
  },
  data() {
    return {
      user: { username: "", email: "", password: "" },
      value: [],
      options: [],
      listUserRoute: ROUTES.LIST_USER
    };
  },

  async mounted() {
    const permissions = await permissionService.getAll();
    this.options = permissions;
    this.user = await userService.findById(this.$route.params.id);

  },

  methods: {
    async update() {
      try {
        const permissions = this.value.map(item => item.id);
        await userService.update(this.user.id, {...this.user, permissions });
        this.$toastr.s("User updateded success.");
        this.$router.push({ path: ROUTES.LIST_USER });
      } catch (error) {
         const message = error.response.data.message;
        this.$toastr.e(message);
      }
    },
  },
};
</script>

<style>
</style>
