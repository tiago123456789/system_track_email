<template>
  <div id="app" class="container">
    <div class="row">
      <form
        class="form-signin col-md-6 offset-3"
        @submit.prevent="resetPassword()"
      >
        <img
          class="mb-4"
          src="./../../assets/img/logo.png"
          alt=""
          width="72"
          height="72"
        />
        <h1 class="h3 mb-3 font-weight-normal">Reset password</h1>

        <div class="form-group text-left" v-if="ischangePassword">
          <label for="">Password:</label>
          <input type="password" v-model="password" class="form-control">
        </div>

        <label for="inputEmail" class="sr-only" v-if="!ischangePassword">Email address</label>
        <input v-if="!ischangePassword"
          v-model="email"
          type="email"
          id="inputEmail"
          class="form-control mb-1"
          placeholder="Email address"
          required=""
          autofocus=""
        />
        <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="isInvalidLink">
          Reset
        </button>
      </form>
    </div>
    <vue-toastr ref="toastr"></vue-toastr>
  </div>
</template>

<script>
import UserService from "../../services/UserService";
import ROUTES from "../../constants/Routes";
import ERROR_MESSAGES from "../../constants/ErrorMessage";

const userService = new UserService();

export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
      password: "",
      ischangePassword: false,
      isInvalidLink: false
    };
  },

  async mounted() {
    const token = this.$route.query.token;
    if (token) {
      this.ischangePassword = true;
      await this.isTokenValid(token);
    }
  },

  methods: {
    cleanDatas() {
      this.email = "";
    },

    async isTokenValid(token) {
      try {
        await userService.checkResetPasswordLink(token);
      } catch(error) {
        const message = error.response.data.message;
        this.$toastr.e(message);
        this.isInvalidLink = true
      }
    },

    async generateResetPasswordLink() {
      try {
        await userService.resetPassword(this.email);
        this.$toastr.s("Reset password link sended success! Check your email.");
      } catch (error) {
        this.$toastr.e(ERROR_MESSAGES[error.code]);
      } finally {
        this.cleanDatas();
      }
    },

    async updatePasswordUsingResetPasswordLink() {
       try {
        await userService.updatePasswordByResetLink(this.$route.query.token, { password: this.password });
        this.$toastr.s("Password updated success.");
        this.$router.push({ path: ROUTES.LOGIN });
      } catch (error) {
        this.$toastr.e(ERROR_MESSAGES[error.code]);
      } finally {
        this.cleanDatas();
      }
    },

    async resetPassword() {
      if (this.ischangePassword) {
        this.updatePasswordUsingResetPasswordLink();
      } else {
        this.generateResetPasswordLink();
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
