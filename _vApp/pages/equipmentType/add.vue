<template>
    <div>
        <v-form id="equipmentTypeAdd" ref="equipmentTypeAdd" @submit.prevent="etAdd" autocomplete="nope">
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
                    to="/equipment/type/list"
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
                       v-model="et.name"
                       label="Name*"
                       name="name"
                       required
                       :rules="validateRules"
                       autocomplete="nope"
                     ></v-text-field>

                     <v-text-field
                       v-model="et.url"
                       label="Url*"
                       type="text"
                       required
                       :rules="validateRules"
                       name="url"
                       autocomplete="nope"
                     ></v-text-field>

                     <Textarea
                         autocomplete="nope"
                         outlined
                         name="description"
                         label="Description"
                         :value="et.description"
                     ></Textarea>

                     <Textarea
                         autocomplete="nope"
                         outlined
                         name="seo_content"
                         label="Accordion"
                         :value="et.description"
                     ></Textarea>

                   </v-tab-item>

                   <v-tab-item :eager="true" class="pa-5">
                     <SEO
                        :seo="et"
                     >
                     </SEO>
                   </v-tab-item>
                 </v-tabs>
               </v-card>

              </v-flex>
              <v-flex class="col sm12 xs12 md3 xl3">
                <div justify="center" class="full">
                  <v-expansion-panels
                  accordion
                  v-model="panel">

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Tie Options</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                        <div
                          v-for="item in et.options"
                          :key="item.id"
                        >
                          <v-checkbox
                            hide-details
                            name="tie_options[]"
                            :value="item.id"
                            v-model="et.selectedOptions"
                            :label="item.name"
                          ></v-checkbox>
                        </div>
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
      var url = '/equipment/type/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/equipment/type/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
        this.et = res.data.equipmentType;
      });
    },
    data () {
      return {
        et: [],
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
                var url = '/equipment/type/edit/' + this.$route.params.id;
                return this.$axiosx.get(url)
                .then((res) => {
                    this.et = res.data.equipmentType;
                });
            }
        },
        getHeading() {
            if (this.et && this.et.name) {
                return 'Type: ' + this.et.name;
            }
            return 'Add Type';
        },
      etAdd () {
        if (this.$refs.equipmentTypeAdd.validate() == false) {
          this.$store.commit('snackbar', {
            status: 'error',
            text: 'Please supply mandatory fields.'
          });
          return true;
        }
        var fd = new FormData(this.$refs.equipmentTypeAdd.$el);
        this.dialog = true;
        var url = '/equipment/type/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/equipment/type/edit/' + this.$router.history.current.params.id;
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
        this.$refs.equipmentTypeAdd.submit();
      },
      addedManufacturer() {
        if (this.$router.history.current.query.added == 'true') {
          this.$store.commit('snackbar', {
            status: 'success',
            text: 'Equipment Type Added Successfully'
          });
        }
      }
    }
  }
</script>
