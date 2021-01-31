<template>
  <div>
    <nav
      class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
      <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">{{
        company
      }}</a>
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" @click="logout()">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import "@/assets/css/dashboard.css";
import AuthService from '../../services/AuthService';
import ROUTES from '../../constants/Routes';

const authService = new AuthService();

export default {
  name: "Header",
  props: {
    company: String,
  },
  methods: {
    async logout() {
      await authService.logout();
      this.$router.push(ROUTES.LOGIN);
    }
  },
};
</script>

<style>
</style>
