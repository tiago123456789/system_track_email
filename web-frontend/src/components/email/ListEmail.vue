<template>
  <Dashboard title="Emails">
    <div class="row">
       <authorizator :permissionToRender="['create_email']">
        <div class="col-md-12 mb-2">
          <router-link :to="newEmailRoute">
            <button class="btn btn-primary">+ New</button>
          </router-link>
        </div>
       </authorizator>
     
      <div class="col-md-12">
        <b-card
          v-for="email in emails"
          :key="email.id"
          :title="email.subject"
          tag="article"
          style="max-width: 200rem"
          class="mb-2"
        >
          <b-card-text
            v-html="email.body"
            style="border: 1px solid rgba(0, 0, 0, 0.1); padding: 10px"
          >
          </b-card-text>
        </b-card>
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
      emails: [],
    };
  },

  async mounted() {
    this.emails = await emailService.getAll();
  },
};
</script>

<style>
</style>
