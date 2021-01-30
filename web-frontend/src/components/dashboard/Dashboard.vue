<template>
  <Dashboard title="Dashboard">
    <div class="row">
      <b-card title="Open's todos" style="max-width: 20rem" class="mb-2 col-4 mr-1">
        <b-card-text>{{qtdTodos}}</b-card-text>
      </b-card>

      <b-card
        title="In progressing todos"
        style="max-width: 20rem"
        class="mb-2 col-4 mr-1"
      >
        <b-card-text>{{qtdInProgressing}}</b-card-text>
      </b-card>

      <b-card title="Done's todos" style="max-width: 20rem" class="mb-2 col-4 mr-1">
        <b-card-text>{{qtdDone}}</b-card-text>
      </b-card>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from "../template/Dashboard";
import todoService from "../../services/TodoService";
import APP from "../../constants/App";

export default {
  name: "DashboardPage",
  components: {
    Dashboard,
  },
  data() {
    return {
      qtdTodos: 0,
      qtdInProgressing: 0,
      qtdDone: 0
    };
  },
  async beforeMount() {
    const userId = localStorage.getItem(APP.LOCALSTORAGE.USER_ID);
    this.qtdTodos = await todoService.getQtdTodosByUserIdAndType(userId, "todo");
    this.qtdInProgressing = await todoService.getQtdTodosByUserIdAndType(userId, "inProgressing");
    this.qtdDone = await todoService.getQtdTodosByUserIdAndType(userId, "done");
  }
};
</script>

<style>
</style>
