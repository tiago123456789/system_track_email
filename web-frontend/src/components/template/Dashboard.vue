<template>
  <div>
    <Header company="System Vue"   />
    <div class="container-fluid row">
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div class="sidebar-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item" v-for="(item, indice) of items" :key="indice">
            <router-link v-bind:to="item.route" class="nav-link active">
              <span data-feather="home"></span>
              {{item.name}} <span class="sr-only"></span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="h2">{{ title }}</h1>
      </div>
      <slot></slot>
    </main>
  </div>
  </div>
  
</template>

<script>
import "@/assets/css/dashboard.css";
import Header from "./Header";
import MENU from "./../../constants/Menu";

export default {
  name: "Dashboard",
  components: {
    Header
  },
  data() {
    return {
      items: MENU.ITENS
    };
  },
  props: {
    title: String,
  },
};
</script>

<style>
</style>
