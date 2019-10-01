<template>
    <div>
        <v-form id="preferredDalerAdd" ref="preferredDalerAdd" @submit.prevent="pAdd" autocomplete="nope">
            <Header
              :heading="getHeading()"
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
                    to="/preferred/dealers"
                    color="info"
                >
                    <v-icon left>mdi-view-list</v-icon>
                    list
                </v-btn>
            </Header>
            <v-layout class="row wrap">
              <v-flex class="col sm12 xs12 md9 xl9">
                <v-card class="full">
                 <v-tabs
                   background-color="white"
                   color="info accent-4"
                   left
                 >
                   <v-tab>Information</v-tab>
                   <v-tab>SEO</v-tab>

                   <v-tab-item :eager="true" class="pa-5">
                     <v-select
                       :items="preferred.states"
                       item-text="name"
                       item-value="id"
                       v-model="preferred.id_state"
                       required
                       label="State"
                       autocomplete="nope"
                     ></v-select>
                     <input type="hidden" name="id_state" :value="preferred.id_state">

                     <v-text-field
                       v-model="preferred.title"
                       label="Page Title*"
                       name="page_title"
                       required
                       :rules="validateRules"
                       persistent-hint
                       autocomplete="nope"
                     ></v-text-field>

                     <v-text-field
                       v-model="preferred.url"
                       label="Url*"
                       type="text"
                       name="url"
                       autocomplete="nope"
                     ></v-text-field>

                     <v-layout row wrap>
                       <v-flex col md6 sm6 xs12>
                         <v-text-field
                           v-model="preferred.email"
                           label="Email"
                           type="email"
                           name="email"
                           autocomplete="nope"
                         ></v-text-field>
                       </v-flex>
                       <v-flex col md6 sm6 xs12>
                         <v-text-field
                           v-model="preferred.phone"
                           label="Phone"
                           length="10"
                           maxlength="10"
                           type="tel"
                           name="phone"
                           autocomplete="nope"
                         ></v-text-field>
                       </v-flex>
                       <v-flex col md6 sm6 xs12>
                         <v-text-field
                           v-model="preferred.city"
                           label="City"
                           type="text"
                           name="city"
                           persistent-hint
                           autocomplete="nope"
                         ></v-text-field>
                       </v-flex>
                       <v-flex col md6 sm6 xs12>
                         <v-select
                           :items="preferred.states"
                           item-text="name"
                           item-value="id"
                           v-model="preferred.state"
                           label="State"
                           autocomplete="nope"
                         ></v-select>
                         <input type="hidden" name="state" :value="preferred.state">
                       </v-flex>
                       <v-flex col md6 sm6 xs12>
                         <v-text-field
                           v-model="preferred.zip"
                           label="Zip"
                           type="tel"
                           name="zip"
                           length="5"
                           maxlength="5"
                           autocomplete="nope"
                         ></v-text-field>
                       </v-flex>

                     </v-layout>

                     <Textarea
                         autocomplete="nope"
                         outlined
                         label="Content"
                         name="content"
                         :value="preferred.content"
                     ></Textarea>

                     <Textarea
                         autocomplete="nope"
                         outlined
                         label="Accordion Content"
                         name="accordion_content"
                         :value="preferred.accordion_content"
                     ></Textarea>

                   </v-tab-item>

                   <v-tab-item class="pa-5" :eager="true">
                     <SEO
                        :seo="preferred"
                     >
                     </SEO>
                   </v-tab-item>
                 </v-tabs>
               </v-card>

              </v-flex>
              <v-flex class="col sm12 xs12 md3 xl3">
                <div justify="center">
                  <v-expansion-panels
                  v-model="panel"
                  accordion>

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Dealer</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                        <v-radio-group v-model="preferred.id_dealer" :mandatory="false">
                          <v-radio
                            :label="item.name"
                            :value="item.id"
                            name="id_dealer"
                            v-for="item in preferred.dealers"
                            :key="item.id"
                          ></v-radio>
                        </v-radio-group>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>Logo</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                          <File
                              block
                              cls="_block"
                              :value="preferred.image"
                              text="Choose Logo"
                              name="id_image"
                              :multiple="false"
                          ></File>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>Default Image</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                          <File
                              block
                              cls="_block"
                              :value="preferred.default_image"
                              text="Choose Default Image"
                              name="id_default_image"
                              :multiple="false"
                          ></File>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>Video</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                          <File
                              block
                              cls="_block"
                              :value="preferred.video"
                              text="Choose Video"
                              name="id_video"
                              type="video"
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
    created () {
      var url = '/preferred/dealer/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/preferred/dealer/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
        this.preferred = res.data.preferred;
      });
    },
    data () {
      return {
        preferred: [],
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
                var url = '/preferred/dealer/edit/' + this.$route.params.id;
                return this.$axiosx.get(url)
                .then((res) => {
                    this.preferred = res.data.preferred;
                });
            }
        },
        getHeading () {
            if (this.ad && this.ad.name) {
                  return 'Preferred Dealer: ' + this.ad.name;
            }

            return 'Add Preferred Dealer';
    },
    pAdd () {
          if (this.$refs.preferredDalerAdd.validate() == false) {
              this.$store.commit('snackbar', {
                status: 'error',
                text: 'Please supply mandatory fields.'
              });
              return true;
          }
        var fd = new FormData(this.$refs.preferredDalerAdd.$el);
        this.dialog = true;
        var url = '/preferred/dealer/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/preferred/dealer/edit/' + this.$router.history.current.params.id;
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
        this.$refs.preferredDalerAdd.submit();
      },
      addedManufacturer() {
        if (this.$router.history.current.query.added == 'true') {
          this.$store.commit('snackbar', {
            status: 'success',
            text: 'Dealer Added Successfully'
          });
        }
      }
    }
  }
</script>
