<template>
  <Dashboard title="Users">
    <div class="row">
      <div class="col-md-12">
        <authorizator :permissionToRender="['create_user']">
          <router-link :to="newUserRoute" class="btn btn-primary mb-2">+ New</router-link>
        </authorizator>
      </div>
      <div class="col-md-12">
        <table class="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button class="btn btn-warning" @click="redirectFormEdition(user.id)">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from "../template/Dashboard";
import "../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
import UserService from "../../services/UserService";
import ROUTES from '../../constants/Routes';

const userService = new UserService();

export default {
  name: "ListUser",
  components: {
    Dashboard
  },
  data() {
    return {
      users: [],
      newUserRoute: ROUTES.USERS
    };
  },

  async mounted() {
    this.users = await userService.findAll();
  },

  methods: {

    redirectFormEdition(id) {
      this.$router.push({ path: `/dashboard/users/${id}`})
    },
  },
};
</script>

<style>
</style>
