<template>
  <div id="app" class="container">
    <div class="row">
      <form
        class="form-signin col-md-6 offset-3"
        @submit.prevent="authenticate()"
      >
        <img
          class="mb-4"
          src="./../../assets/img/logo.png"
          alt=""
          width="72"
          height="72"
        />
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          v-model="username"
          class="form-control mb-1"
          placeholder="Email address"
          required=""
          autofocus=""
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          v-model="password"
          type="password"
          id="inputPassword"
          class="form-control mb-1"
          placeholder="Password"
          required=""
        />
        <router-link :to="resetPasswordRoute" class="float-left">
          No remember password?
        </router-link>
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
    <vue-toastr ref="toastr"></vue-toastr>
  </div>
</template>

<script>
import Credential from "../../models/Credential";
import AuthService from "../../services/AuthService";
import Constants from "../../constants/App";
import ROUTES from "../../constants/Routes";

const authService = new AuthService();

export default {
  name: "Login",
  data() {
    return {
      resetPasswordRoute: ROUTES.RESET,
      username: "",
      password: "",
    };
  },
  mounted() {
    if (authService.isAuthenticated()) {
      this.$router.push({ path: ROUTES.DASHBOARD })
    }
  },
  methods: {
    cleanDatas() {
      this.username = "";
      this.password = "";
    },

    async authenticate() {
      try {
        const credential = new Credential(this.username, this.password);
        const data = await authService.authenticate(credential);
        localStorage.setItem(Constants.LOCALSTORAGE.ACCESS_TOKEN, data.accessToken);
        this.$router.push({ path: ROUTES.DASHBOARD })
      } catch (error) {
        const message = error.response.data.message;
        this.$toastr.e(message);
      } finally {
        this.cleanDatas();
      }
    },
  },
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
