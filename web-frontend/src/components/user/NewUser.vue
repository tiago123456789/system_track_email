<template>
  <Dashboard title="New User">
    <div class="row">
      <form class="col-md-12" @submit.prevent="save()">
        <div class="form-group">
          <label for="">Username</label>
          <input type="text" v-model="newUser.username" class="form-control" />
        </div>
        <div class="form-group">
          <label for="">Email:</label>
          <input type="email" v-model="newUser.email" class="form-control" />
        </div>
        <div class="form-group">
          <label for="">Senha:</label>
          <input
            type="password"
            v-model="newUser.password"
            class="form-control"
          />
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
          <button class="btn btn-primary">Save</button>&nbsp;
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
  name: "ListUser",
  components: {
    Dashboard,
    Multiselect,
  },
  data() {
    return {
      newUser: { username: "", email: "", password: "" },
      value: [],
      options: [],
      listUserRoute: ROUTES.LIST_USER
    };
  },

  async beforeMount() {
    const permissions = await permissionService.getAll();
    this.options = permissions;
  },

  methods: {
    cleanForm() {
      this.newUser = { username: "", email: "", password: "" };
      this.value = [];
    },

    async save() {
      try {
        const userCreated = await userService.create(this.newUser);
        const permissions = this.value.map(item => item.id);
        await permissionService.addPermissionForUser(userCreated.id, permissions);
        this.$toastr.s("User created success.");
        this.cleanForm()
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
