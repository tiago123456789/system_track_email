<template>
  <Dashboard title="New email">
    <div class="row">
      <form class="col-md-12" @submit.prevent="save()">
        <div class="form-group">
          <label for="">Assunto:</label>
          <input type="text" v-model="newEmail.subject" class="form-control" />
        </div>
        <div class="form-group">
          <label for="">Remetente:</label>
          <input type="email" v-model="newEmail.from" class="form-control" />
        </div>
        <div class="form-group" v-if="!isFormToPublishNewsletter">
          <label for="">Destinatário:</label>
          <input type="email" v-model="newEmail.to" class="form-control" />
        </div>
        <div class="form-group">
          <label for="">Corpo do email:</label>
          <ckeditor v-model="newEmail.body" :config="editorConfig"></ckeditor>
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Save</button>&nbsp;
          <router-link :to="cancelRoute">
            <button class="btn btn-danger">Cancel</button>
          </router-link>
        </div>
      </form>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from "../template/Dashboard";
import ROUTES from "../../constants/Routes";
import EmailService from "../../services/EmailService";

const emailService = new EmailService();

export default {
  name: "NewEmail",
  components: {
    Dashboard,
  },
  data() {
    return {
      editorConfig: {
        alignment: {
          options: ["left", "center", "right"],
        },
      },
      newEmail: {
        subject: "",
        from: "",
        to: "",
        body: "",
      },
      isFormToPublishNewsletter: false,
      cancelRoute: ROUTES.EMAILS,
    };
  },

  methods: {
    cleanForm() {
      this.newEmail = {
        subject: "",
        from: "",
        to: "",
        body: "",
      };
    },
    async save() {
      try {
        await emailService.send(this.newEmail);
        this.$toastr.s("Email created success");
        this.cleanForm();
      } catch(error) {
        const message = error.response.data.message;
        this.$toastr.e(message);
      }
    }
  },
  async mounted() {
    const isForPublishNewsletter = this.$route.params.id != null;
    if (isForPublishNewsletter) {
      this.isFormToPublishNewsletter = true;
    }
  },
};
</script>

<style>
</style>
