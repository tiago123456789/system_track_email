<template>
  <Dashboard title="New email">
    <div class="row">
      <form class="col-md-12" @submit.prevent="save()">
         <div class="form-group">
          <label for="">Schedule send email for<span class="text-bold">(Only use this field case need schedule send the email)</span></label>
          <input type="datetime-local" v-model="newEmail.scheduledAt" class="form-control" />
        </div>
        <div class="form-group">
          <label for="">Assunto:</label>
          <input type="text" v-model="newEmail.subject" class="form-control" />
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
import NesletterService from "../../services/NewsletterService";

const emailService = new EmailService();
const newsletterService = new NesletterService();

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
        scheduledAt: ""
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

    async saveEmail() {
      try {
        await emailService.send(this.newEmail);
        this.$toastr.s("Email created success");
        this.cleanForm();
      } catch(error) {
        const message = error.response.data.message;
        this.$toastr.e(message);
      }
    },
    async publishNewsletter() {
       try {
        await newsletterService.publish(this.$route.params.id, this.newEmail);
        this.$toastr.s("Published newsletter with success.");
        this.cleanForm();
      } catch(error) {
        const message = error.response.data.message;
        this.$toastr.e(message);
      }
    },
    async save() {
        if (this.isFormToPublishNewsletter) {
          this.publishNewsletter();
        } else {
          this.saveEmail();
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
