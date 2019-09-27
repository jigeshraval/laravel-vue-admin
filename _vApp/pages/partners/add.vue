<template>
    <div>
        <v-form id="partnersAdd" ref="partnersAdd" @submit.prevent="partnersAdd" autocomplete="nope">
            <Header
              heading="Partners"
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
                    to="/completed/projects/list"
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

                   <v-textarea
                     label="About"
                     auto-grow
                     name="about"
                     outlined
                     v-model="partners.about"
                   ></v-textarea>

                   <v-switch
                     v-model="partners.status"
                     inset
                     color="success"
                     name="status"
                     :value="partners.status"
                     label="Status"
                   ></v-switch>
               </v-card>

              </v-flex>
              <v-flex class="col sm12 xs12 md3 xl3">
                <div justify="center" class="full">
                  <v-expansion-panels accordion>
                    <v-expansion-panel>
                      <v-expansion-panel-header>Logo</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Logo
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
import LeftColumn from '../../components/LeftColumn.vue'
Vue.component('LeftColumn', LeftColumn)

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
      partnersAdd () {
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
