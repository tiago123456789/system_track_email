<template>
  <Dashboard title="Newsletters">
    <div class="row">
       <authorizator :permissionToRender="['create_newsletter']">
          <div class="col-md-12">
        <b-card
          title="New newsletter"
          img-top
          tag="article"
          class="mb-2 col-md-12"
        >
          <b-card-text>
            <form class="col-md-12" @submit.prevent="save()">
              <div class="form-group">
                <label for="">Name:</label>
                <input type="text" v-model="newNewsletter.name" class="form-control" />
              </div>

              <div class="form-group">
                <button class="btn btn-primary">Save</button>
              </div>
            </form>
          </b-card-text>
        </b-card>
      </div>
      </authorizator>
     
      <div class="col-md-12">
        <table class="text-center table table-striped table-bordered">
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="newsletter in newsletters" :key="newsletter.id">
              <td>{{ newsletter.id }}</td>
              <td>{{ newsletter.name }}</td>
              <td>
                <authorizator :permissionToRender="['view_newsletter_publish']">
                  <button class="btn btn-success" @click="redirectToPageCreateAndPublish(newsletter.id)">Publish</button>
                </authorizator>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Dashboard>
</template>

<script>
import Dashboard from "../template/Dashboard";
import NewsletterService from "../../services/NewsletterService";

const newsletterService = new NewsletterService();

export default {
  name: "ListNewsletter",
  components: {
    Dashboard
  },
  data() {
    return {
      newNewsletter: {
        name: ""
      },
      newsletters: []
    };
  },

  methods: {
    cleanForm() {
      this.newNewsletter = {
        name: ""
      };
    },

    async save() {
       try {
        const newsletterCreated = await newsletterService.create(this.newNewsletter.name);
        this.newsletters.push(newsletterCreated);
        this.$toastr.s("Newsletter created success.");
        this.cleanForm()
      } catch (error) {
         const message = error.response.data.message;
        this.$toastr.e(message);
      }
    },

    redirectToPageCreateAndPublish(id) {
      this.$router.push({ path: `/dashboard/newsletter/${id}/publish`, })
    }
  },

  async mounted() {
    this.newsletters = await newsletterService.getAll();
  }
};
</script>

<style>
</style>
