<template>
    <div>
        <v-form id="equipmentCategoryAdd" ref="equipmentCategoryAdd" @submit.prevent="ecAdd" autocomplete="nope">
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
                    to="/equipment/category/list"
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
                     <v-text-field
                       v-model="ec.name"
                       label="Name*"
                       name="name"
                       required
                       :rules="validateRules"
                       autocomplete="nope"
                     ></v-text-field>

                     <v-text-field
                       v-model="ec.url"
                       label="Url*"
                       type="text"
                       required
                       :rules="validateRules"
                       name="url"
                       autocomplete="nope"
                     ></v-text-field>

                      <v-text-field
                        v-model="ec.buyers_guide"
                        label="Buyers Guide*"
                        name="buyers_guide"
                        type="url"
                        :rules="validateRules"
                        autocomplete="nope"
                      ></v-text-field>

                      <Textarea
                          autocomplete="nope"
                          outlined
                          name="about"
                          label="Category Description (Displayed on New Equipment Listing Page)"
                          :value="ec.about"
                      ></Textarea>

                      <Textarea
                            label="Category Description (Displayed on Used Equipment Listing Page)"
                            autocomplete="nope"
                            outlined
                            name="used_about"
                            :value="ec.used_about"
                      ></Textarea>

                      <Textarea
                            label="New Accordion Content"
                            autocomplete="nope"
                            outlined
                            name="new_seo_content"
                            :value="ec.new_seo_content"
                      ></Textarea>

                      <Textarea
                            label="Used Accordion Content"
                            autocomplete="nope"
                            outlined
                            name="used_seo_content"
                            :value="ec.used_seo_content"
                      ></Textarea>

                   </v-tab-item>

                   <v-tab-item  :eager="true" class="pa-5">
                     <SEO
                        :seo="ec"
                     >
                     </SEO>
                   </v-tab-item>
                 </v-tabs>
               </v-card>

              </v-flex>
              <v-flex class="col sm12 xs12 md3 xl3">
                <div justify="center" class="full">
                  <v-expansion-panels accordion v-model="panel">

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Equipment Type</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                        <v-radio-group v-model="ec.id_equipment_type">
                          <v-radio
                            :label="item.name"
                            :value="item.id"
                            name="id_equipment_type"
                            v-for="item in ec.type"
                            :key="item.id"
                          ></v-radio>
                        </v-radio-group>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>Image</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                            <File
                                block
                                cls="_block"
                                :value="ec.media"
                                text="Choose Image"
                                name="id_media"
                                :multiple="false"
                            ></File>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>Default Image</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                            <File
                                block
                                cls="_block"
                                :value="ec.default_media"
                                text="Choose Image"
                                name="id_default_media"
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
      var url = '/equipment/category/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/equipment/category/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
        this.ec = res.data.equipmentCategory;
      });
    },
    data () {
      return {
        ec: [],
        actions: [],
        type: [],
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
              var url = '/equipment/category/edit/' + this.$route.params.id;
              return this.$axiosx.get(url)
              .then((res) => {
                  this.ec = res.data.equipmentCategory;
              });
          }
      },
        getHeading () {
            if (this.ec && this.ec.name) {
                  return 'Category : ' + this.ec.name;
            }

            return 'Add Category ';
        },
      ecAdd () {
          if (this.$refs.equipmentCategoryAdd.validate() == false) {
            this.$store.commit('snackbar', {
              status: 'error',
              text: 'Please supply mandatory fields.'
            });
            return true;
          }
        var fd = new FormData(this.$refs.equipmentCategoryAdd.$el);
        this.dialog = true;
        var url = '/equipment/category/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/equipment/category/edit/' + this.$router.history.current.params.id;
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
      // saveManufacturer () {
      //   this.$refs.equipmentCategoryAdd.submit();
      // },
      added() {
        if (this.$router.history.current.query.added == 'true') {
          this.$store.commit('snackbar', {
            status: 'success',
            text: 'Equipment Category Added Successfully'
          });
        }
      }
    }
  }
</script>
