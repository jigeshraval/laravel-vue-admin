<template>
    <div>
        <v-form id="equipmentAdd" ref="equipmentAdd" @submit.prevent="equipmentAdd" autocomplete="nope">
            <Header
              :heading="getHeading()"
            >
            <v-switch
                v-model="equipment.status"
                inset
                hide-details
                class="mr-8"
                color="success"
                :value="equipment.status"
                label="Status"
                name="status"
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
                    to="/equipment"
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
                   <v-tab>Filters</v-tab>
                   <v-tab>Variants</v-tab>
                   <v-tab>SEO</v-tab>

                   <v-tab-item :eager="true" class="pa-5">
                     <v-text-field
                       v-model="equipment.title"
                       label="Title*"
                       name="title"
                       required
                       :rules="validateRules"
                       autocomplete="nope"
                     ></v-text-field>

                     <v-text-field
                       v-model="equipment.url"
                       label="Model Number*"
                       type="text"
                       required
                       :rules="validateRules"
                       name="model_number"
                       autocomplete="nope"
                     ></v-text-field>

                     <Textarea
                         autocomplete="nope"
                         outlined
                         name="description"
                         label="Description"
                         :value="equipment.about"
                     ></Textarea>

                      <v-text-field
                        v-model="equipment.lead_time"
                        label="Lead Time*"
                        name="lead_time"
                        type="number"
                        required
                        min="0"
                        suffix="Week"
                        :rules="validateRules"
                        autocomplete="nope"
                      ></v-text-field>

                      <v-text-field
                        v-model="equipment.price"
                        label="Price*"
                        name="price"
                        type="text"
                        required
                        min="0"
                        prefix="$"
                        :rules="validateRules"
                        autocomplete="nope"
                      ></v-text-field>
                      <v-layout row wrap>
                          <v-flex col xs12 sm6>
                            <v-text-field
                                v-model="equipment.weight"
                                label="Weight"
                                name="weight"
                                type="number"
                                autocomplete="nope"
                                min="0"
                            ></v-text-field>
                          </v-flex>

                          <v-flex col xs12 sm6>
                                <v-text-field
                                    v-model="equipment.feet"
                                    label="Feet"
                                    name="feet"
                                    min="0"
                                    type="number"
                                    autocomplete="nope"
                                ></v-text-field>
                          </v-flex>
                      </v-layout>

                      <v-text-field
                          v-model="equipment.trucks"
                          label="Trucks"
                          name="trucks"
                          type="number"
                          min="0"
                          autocomplete="nope"
                      ></v-text-field>

                      <Geo
                        @geo="setLocationData"
                        label="Location"
                        id="location"
                        :value="equipment"
                      >
                      </Geo>

                      <v-text-field
                        v-model="equipment.buyers_guide"
                        label="Buyers Guide"
                        name="buyers_guide"
                        type="url"
                        autocomplete="nope"
                      ></v-text-field>

                   </v-tab-item>

                   <v-tab-item :eager="true" class="pa-5">
                       <div class="" v-if="equipment.filter && equipment.filter.length">
                           <v-layout row wrap>
                                <v-flex xs12 sm12 :key="filter.id" v-for="filter in equipment.filter" v-if="filter.name != 'Manufacturer'">
                                    <div class="full" v-if="filter.input_type == 'select'">
                                        <v-col class="d-flex" cols="12" sm="12">
                                           <v-select
                                             :items="filter.values"
                                             item-text="value"
                                             item-value="id"
                                             hide-details
                                             flat
                                             v-model="equipment.option[filter.id]"
                                             :label="filter.name"
                                             dense
                                           ></v-select>
                                           <input type="hidden" :name="'option' + '['+ filter.id +']'" :value="equipment.option[filter.id]">
                                         </v-col>
                                    </div>

                                    <div class="full _filterRadio px-3 pt-2 ma-3" v-if="filter.input_type == 'radio'">
                                        {{ filter.name }}
                                        <v-radio-group class="flex" row v-model="equipment.option[filter.id]">
                                          <v-radio
                                            class="flex"
                                            hide-details
                                            :label="item.value"
                                            :value="item.id"
                                            :name="'option' + '['+ filter.id +']'"
                                            v-for="item in filter.values"
                                            :key="item.id"
                                          ></v-radio>
                                        </v-radio-group>
                                    </div>

                                    <div class="full" v-if="filter.input_type == 'checkbox'">

                                    </div>
                                </v-flex>
                           </v-layout>
                       </div>
                       <div class="" v-else>
                            <v-alert
                                outlined
                                type="error"
                            >
                               Please choose type
                            </v-alert>
                       </div>
                   </v-tab-item>

                   <v-tab-item  :eager="true" class="pa-5">
                       Variants
                   </v-tab-item>

                   <v-tab-item  :eager="true" class="pa-5">
                        <SEO
                            :seo="equipment"
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
                      <v-expansion-panel-header>Type</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                        <v-radio-group v-model="equipment.id_equipment_type">
                          <v-radio
                            :label="item.name"
                            :value="item.id"
                            name="id_equipment_type"
                            v-for="item in equipment.type"
                            :key="item.id"
                          ></v-radio>
                        </v-radio-group>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Category</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                        <v-radio-group
                            v-if="equipment.categories && equipment.categories.length"
                            v-model="equipment.id_category"
                        >
                          <v-radio
                            :label="item.name"
                            :value="item.id"
                            hide-details
                            name="id_category"
                            v-for="item in equipment.categories"
                            :key="item.id"
                          ></v-radio>

                        </v-radio-group>
                        <v-alert
                          v-else
                          outlined
                          type="error">
                            Please choose type
                        </v-alert>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Manufacturer</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                        <v-radio-group v-model="equipment.id_manufacturer">
                          <v-radio
                            :label="item.name"
                            :value="item.id"
                            name="id_manufacturer"
                            v-for="item in equipment.manufacturers"
                            :key="item.id"
                          ></v-radio>
                        </v-radio-group>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Is Equipment Used?</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                        <v-radio-group v-model="equipment.used">
                          <v-radio
                            :label="item.name"
                            :value="item.id"
                            name="used"
                            v-for="item in used_option"
                            :key="item.id"
                          ></v-radio>
                        </v-radio-group>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>Brochure</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                            <File
                                block
                                cls="_block"
                                :value="equipment.brochure"
                                text="Choose PDF"
                                name="id_brochure"
                                type="pdf"
                                :multiple="false"
                            ></File>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>Spec Sheet</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                            <File
                                block
                                cls="_block"
                                :value="equipment.spec_sheet"
                                text="Choose PDF"
                                name="id_spec_sheet"
                                type="pdf"
                                :multiple="false"
                            ></File>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>Images</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                            <File
                                block
                                cls="_block"
                                :value="equipment.images"
                                text="Choose Image"
                                name="images"
                                :multiple="true"
                            ></File>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>Videos</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                            <File
                                block
                                cls="_block"
                                :value="equipment.videos"
                                text="Choose Videos"
                                name="videos"
                                type="video"
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
      var url = '/equipment/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/equipment/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
            this.equipment = res.data.equipment;
            // if (this.equipment.id_equipment_type) {
            //     this.changeData(this.equipment.id_equipment_type);
            // }
      });
    },
    data () {
      return {
        equipment: {
            id_equipment_type: null,
            categories: null,
            option: []
        },
        panel: 0,
        used_option: [
            {
                id: 0,
                name: 'No'
            },
            {
                id: 1,
                name: 'Yes'
            },
        ],
        validateRules: [
          v => !!v || 'This field is required'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ]
      }
    },
    watch: {
        '$route.query.added' : function (val) {
          this.getData();
        },
        'equipment.feet': function (val) {
          if (val > 53) {
            this.equipment.feet = 53;
            this.$store.commit('snackbar', {
                status: 'error',
                text: 'Maximum allowed length is 53 feet'
            });
            return false;
          }
        },
        'equipment.weight': function (val) {
          if (val > 44000) {
            this.equipment.weight = 44000;
            this.$store.commit('snackbar',  {
                status: 'error',
                text: 'Maximum allowed weight is 44000 Lbs'
            });
            return false;
          }
        },
        'equipment.id_equipment_type': function (val) {
            var equipment_types = this.equipment.type;
            var equipment_categories = [];
            var equipment_filter = [];
            var selected_type = val;

            Object.keys(equipment_types).forEach(function (value, index) {
              if (equipment_types[value].id == selected_type) {
                  equipment_categories = equipment_types[value].categories;
                  equipment_filter = equipment_types[value].filter;
              }
            });

            this.equipment.categories = equipment_categories;
            this.equipment.filter = equipment_filter;
        }
    },
    methods: {
        getOptionModal () {
            return 'test';
        },
        setLocationData (addressData) {
            this.equipment.location = addressData.location;
            this.equipment.street = addressData.name;
            this.equipment.city = addressData.locality;
            this.equipment.state = addressData.administrative_area_level_1;
            this.equipment.zip = addressData.postal_code;
            this.equipment.lat = addressData.latitude;
            this.equipment.lng = addressData.longitude;
            console.log('data set');
        },
        getData () {
            if (this.$route.params && this.$route.params.id) {
                var url = '/equipment/edit/' + this.$route.params.id;
                return this.$axiosx.get(url)
                .then((res) => {
                this.equipment = res.data.equipment;
                });
            }
        },
        getHeading () {
            if (this.equipment && this.equipment.title) {
                  return 'Equipment : ' + this.equipment.title;
            }

            return 'Add Equipment';
        },
      equipmentAdd () {
          if (this.$refs.equipmentAdd.validate() == false) {
            this.$store.commit('snackbar', {
                  status: 'error',
                  text: 'Please supply mandatory fields.'
            });
            return true;
          }

        var focusedEl = document.activeElement;
        if (focusedEl && focusedEl.getAttribute('id') == 'location') {
          return true;
        }

        var fd = new FormData(this.$refs.equipmentAdd.$el);
        this.dialog = true;
        var url = '/equipment/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/equipment/edit/' + this.$router.history.current.params.id;
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
            text: 'Equipment Added Successfully'
          });
        }
      }
    }
  }
</script>

<style media="screen">
    ._filterRadio {
        border: 1px solid #c2c2c2;
        border-radius: 4px;
    }
    body ._filterRadio .v-input__slot {
        margin-bottom: 0px !important;
    }
</style>
