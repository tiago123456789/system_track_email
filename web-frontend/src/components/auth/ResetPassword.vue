<template>
  <div id="app" class="container">
    <div class="row">
      <form
        class="form-signin col-md-6 offset-3"
        @submit.prevent="resetPassword()"
      >
        <img
          class="mb-4"
          src="./../../assets/logo.png"
          alt=""
          width="72"
          height="72"
        />
        <h1 class="h3 mb-3 font-weight-normal">Reset password</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          v-model="email"
          type="email"
          id="inputEmail"
          class="form-control mb-1"
          placeholder="Email address"
          required=""
          autofocus=""
        />
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Reset
        </button>
      </form>
    </div>
    <vue-toastr ref="toastr"></vue-toastr>
  </div>
</template>

<script>
import authService from "../../services/AuthService";
import ERROR_MESSAGES from "../../constants/ErrorMessage";

export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    cleanDatas() {
      this.email = "";
    },
    async resetPassword() {
      try {
        await authService.resetPassword(this.email);
        this.$toastr.s("Link reset password sended success! Check your email.");
      } catch (error) {
        this.$toastr.e(ERROR_MESSAGES[error.code]);
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
