<template>
    <div>
        <v-form id="partnersAdd" ref="partnersAdd" @submit.prevent="partnersAdd" autocomplete="nope">
            <Header
              :heading="getHeading()"
            >
                <v-switch
                    hide-details
                    class="mr-8"
                  v-model="partners.status"
                  inset
                  color="success"
                  name="status"
                  :value="partners.status"
                  label="Status"
                ></v-switch>
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
                    to="/partners"
                    color="info"
                >
                    <v-icon left>mdi-view-list</v-icon>
                    list
                </v-btn>
            </Header>
            <v-layout class="row wrap">
              <v-flex class="col sm12 xs12 md9 xl9">
                <v-card class="full pa-5">
                   <v-text-field
                     v-model="partners.name"
                     label="Name*"
                     name="name"
                     required
                     :rules="validateRules"
                     autocomplete="nope"
                   ></v-text-field>

                   <v-text-field
                     v-model="partners.website"
                     label="Website*"
                     type="url"
                     required
                     :rules="validateRules"
                     name="website"
                     autocomplete="nope"
                   ></v-text-field>

                   <Textarea
                       autocomplete="nope"
                       outlined
                       name="about"
                       label="About"
                       :value="partners.about"
                   ></Textarea>
               </v-card>

              </v-flex>
              <v-flex class="col sm12 xs12 md3 xl3">
                <div justify="center" class="full">
                  <v-expansion-panels
                  accordion
                  v-model="panel">
                    <v-expansion-panel>
                      <v-expansion-panel-header>Logo</v-expansion-panel-header>
                      <v-expansion-panel-content>
                          <File
                              block
                              cls="_block"
                              :value="partners.logo"
                              text="Choose Image"
                              name="id_logo"
                              :multiple="false"
                          ></File>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-flex>
            </v-layout>
      </v-form>
    </div>
</template>
<script>
import Vue from 'vue'

import Seo from '../components/SEO.vue'
Vue.component('SEO', Seo)
  export default {
    beforeCreate() {
      var url = '/partners/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/partners/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
        this.partners = res.data.partners;

        if (this.partners.status == 1) {
          this.partners.status == true;
        } else {
          this.partners.status == false;
        }

      });
    },
    data () {
      return {
        partners: [],
        panel: 0,
        validateRules: [
          v => !!v || 'This field is required'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ]
      }
    },
    watch : {
      '$route.query.added' : function (val) {
          this.getData();
      }
    },
    methods: {
      getData () {
        if (this.$route.params && this.$route.params.id) {
              var url = '/partners/edit/' + this.$route.params.id;
              return this.$axiosx.get(url)
              .then((res) => {
                  this.partners = res.data.partners;

                  if (this.partners.status == 1) {
                    this.partners.status == true;
                  } else {
                    this.partners.status == false;
                  }
              });
          }
      },
      getHeading () {
          if (this.partners && this.partners.name) {
                return 'Partners: ' + this.partners.name;
          }

          return 'Add partners';
      },
      partnersAdd () {
          if (this.$refs.partnersAdd.validate() == false) {
              this.$store.commit('snackbar', {
                status: 'error',
                text: 'Please supply mandatory fields.'
              });
              return true;
          }
        var fd = new FormData(this.$refs.partnersAdd.$el);
        this.dialog = true;
        var url = '/partners/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/partners/edit/' + this.$router.history.current.params.id;
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
        this.$refs.partnersAdd.submit();
      },
      addedManufacturer() {
        if (this.$router.history.current.query.added == 'true') {
          this.$store.commit('snackbar', {
            status: 'success',
            text: 'Completed Project Added Successfully'
          });
        }
      }
    }
  }
</script>
