<template>
  <Dashboard title="Actions tracked">
    <div class="row">
      <div class="col-md-12">
          <b-table hover :items="actionsTracked"></b-table>
      </div>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from "../template/Dashboard";
import EmailService from "../../services/EmailService";
import ROUTES from "../../constants/Routes";

const emailService = new EmailService();

export default {
  name: "ListEmail",
  components: {
    Dashboard,
  },
  data() {
    return {
      newEmailRoute: ROUTES.NEW_EMAIL,
      actionsTracked: [],
    };
  },

  async mounted() {
    const actionsTracked = await emailService.getActionsTracked(this.$route.params.id);
    this.actionsTracked = actionsTracked.map(item => ({ 
      id: item.id,
      action: item.actions,
      link: item.link, 
      createdAt: item.created_at,
      receiver: item.to
    }))
  },
};
</script>

<style>
</style>
