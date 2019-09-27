<template>
    <div>
        <v-form id="pageAdd" ref="pageAdd" @submit.prevent="pageAdd" autocomplete="nope">
            <Header
              :heading="actions.heading"
            >
              <v-btn
                  min-width="130px"
                  color="success"
                  class="mr-5"
                  type="submit"
                  :loading="$store.state.loading"
              >
                  <v-icon left>mdi-content-save-outline</v-icon>
                  Save
              </v-btn>
              <v-btn
                  :to="actions.slug"
                  color="info"
              >
                  <v-icon left>mdi-view-list</v-icon>
                  list
              </v-btn>
            </Header>
            <v-card class="full">
                 <v-tabs
                   background-color="white"
                   color="info accent-4"
                   left
                 >
                 <v-tab>Information</v-tab>
                 <v-tab>SEO</v-tab>
                 <v-tab-item class="pa-5">
                   <v-text-field
                     v-model="page.name"
                     label="Name*"
                     name="name"
                     required
                     :rules="validateRules"
                     autocomplete="nope"
                   ></v-text-field>

                   <v-text-field
                     v-model="page.url"
                     label="Url*"
                     type="text"
                     required
                     :rules="validateRules"
                     name="url"
                     autocomplete="nope"
                   ></v-text-field>

                   <v-text-field
                     v-model="page.body_class"
                     label="Body Class"
                     type="text"
                     name="body_class"
                     autocomplete="nope"
                   ></v-text-field>

                   <v-textarea
                     auto-grow
                     outlined
                     name="content"
                     label="Content"
                     v-model="page.content"
                   ></v-textarea>

                  <v-switch
                    v-model="page.status"
                    inset
                    name="status"
                    label="Status"
                    color="success"
                    :value="page.status"
                  ></v-switch>

                 </v-tab-item>

              <v-tab-item class="pa-5">
                <SEO
                  :seo="page"
                >
                </SEO>
              </v-tab-item>
            </v-tabs>
          </v-card>
      </v-form>
    </div>
</template>
<script>
  export default {
    beforeCreate() {
      var url = '/page/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/page/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
        this.page = res.data.page;
        this.actions = res.data.actions;
      });
    },
    data () {
      return {
        page: [],
        actions: [],
        validateRules: [
          v => !!v || 'This field is required'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ]
      }
    },
    methods: {
      pageAdd () {
        var fd = new FormData(this.$refs.pageAdd.$el);
        this.dialog = true;
        var url = '/page/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/page/edit/' + this.$router.history.current.params.id;
        }
        this.$axiosx.post(url, fd).then((res) => {
          if (res.data.status == 'error') {
            this.$store.commit('snackbar', res.data);
          }

          if (res.data.status == 'redirect') {
            this.$router.push({
              path: res.data.text,
              query: { added: 'true' }
            });
            this.addedManufacturer();
          }
          if (res.data.status == 'success') {
              this.$store.commit('snackbar', res.data);
          }
        });
      },
      saveManufacturer () {
        this.$refs.pageAdd.submit();
      },
      addedManufacturer() {
        if (this.$router.history.current.query.added == 'true') {
          this.$store.commit('snackbar', {
            status: 'success',
            text: 'Page Added Successfully'
          });
        }
      }
    }
  }
</script>
