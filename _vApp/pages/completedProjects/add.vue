<template>
    <div>
        <v-form id="completedProjectsAdd" ref="completedProjectsAdd" @submit.prevent="cpAdd" autocomplete="nope">
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
                    to="/completed/projects"
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

                   <v-tab-item class="pa-5" :eager="true">
                     <v-text-field
                       v-model="cp.title"
                       label="Title*"
                       name="title"
                       required
                       :rules="validateRules"
                       persistent-hint
                       autocomplete="nope"
                     ></v-text-field>

                     <v-text-field
                       v-model="cp.url"
                       label="Url*"
                       type="text"
                       required
                       :rules="validateRules"
                       name="url"
                       autocomplete="nope"
                     ></v-text-field>

                     <v-text-field
                       v-model="cp.year_installed"
                       label="Year Installed*"
                       name="year_installed"
                       required
                       :rules="validateRules"
                       type="tel"
                       length="5"
                       maxlength="5"
                       autocomplete="nope"
                     ></v-text-field>

                     <v-layout row wrap>
                       <v-flex col md6 sm6 xs12>
                         <v-text-field
                           v-model="cp.city"
                           label="City"
                           type="text"
                           name="city"
                           persistent-hint
                           autocomplete="nope"
                         ></v-text-field>
                       </v-flex>
                       <v-flex col md6 sm6 xs12>
                         <v-select
                           :items="cp.states"
                           item-text="name"
                           item-value="id"
                           v-model="cp.id_state"
                           label="State"
                           autocomplete="nope"
                         ></v-select>
                         <input type="hidden" name="state" :value="cp.id_state">
                       </v-flex>
                       <v-flex col md6 sm6 xs12>
                         <v-text-field
                           v-model="cp.zip"
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
                         name="description"
                         label="Description"
                         :value="cp.description"
                     ></Textarea>

                     <Textarea
                         autocomplete="nope"
                         outlined
                         name="specification"
                         label="Specification"
                         :value="cp.specification"
                     ></Textarea>

                     <Textarea
                         autocomplete="nope"
                         outlined
                         name="component_requirement"
                         label="Component Requirement"
                         :value="cp.component_requirement"
                     ></Textarea>

                     <Textarea
                         autocomplete="nope"
                         outlined
                         name="additional_details"
                         label="Additional Details"
                         :value="cp.additional_details"
                     ></Textarea>

                   </v-tab-item>

                   <v-tab-item class="pa-5" :eager="true">
                     <SEO
                        :seo="cp"
                     >
                     </SEO>
                   </v-tab-item>
                 </v-tabs>
               </v-card>

              </v-flex>
              <v-flex class="col sm12 xs12 md3 xl3">
                <div justify="center">
                  <v-expansion-panels accordion>

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Dealer</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                        <v-radio-group v-model="cp.id_dealer" :mandatory="false">
                          <v-radio
                            :label="item.name"
                            :value="item.id"
                            name="id_dealer"
                            v-for="item in cp.dealers"
                            :key="item.id"
                          ></v-radio>
                        </v-radio-group>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Manufacturers</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                        <v-radio-group v-model="cp.id_manufacturer" :mandatory="false">
                          <v-radio
                            :label="item.name"
                            :value="item.id"
                            name="id_manufacturer"
                            v-for="item in cp.manufacturers"
                            :key="item.id"
                          ></v-radio>
                        </v-radio-group>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>Hero Videos</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                          <File
                              block
                              cls="_block"
                              :value="cp.video"
                              text="Choose Video"
                              name="id_video"
                              type="video"
                              :multiple="false"
                          ></File>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>PDF</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                          <File
                              block
                              cls="_block"
                              :value="cp.pdf"
                              text="Choose PDF"
                              name="id_pdf"
                              type="pdf"
                              :multiple="false"
                          ></File>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header>Images</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                            <File
                                block
                                cls="_block"
                                :value="cp.images"
                                text="Choose Images"
                                name="images"
                                :multiple="true"
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
      var url = '/completed/project/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/completed/project/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
        this.cp = res.data.cp;
      });
    },
    data () {
      return {
        cp: [],
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
              var url = '/completed/project/edit/' + this.$route.params.id;
              return this.$axiosx.get(url)
              .then((res) => {
                this.cp = res.data.cp;
              });
          }
      },
        getHeading() {
            if (this.ad && this.ad.name) {
                return 'Completed Project: ' + this.ad.name;
            }

            return 'Add Completed Project';
        },
      cpAdd () {
        if (this.$refs.completedProjectsAdd.validate() == false) {
          this.$store.commit('snackbar', {
            status: 'error',
            text: 'Please supply mandatory fields.'
          });
          return true;
        }
        var fd = new FormData(this.$refs.completedProjectsAdd.$el);
        this.dialog = true;
        var url = '/completed/project/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/completed/project/edit/' + this.$router.history.current.params.id;
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
            this.added();
          }
          if (res.data.status == 'success') {
              this.$store.commit('snackbar', res.data);
          }
        });
      },
      added() {
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
