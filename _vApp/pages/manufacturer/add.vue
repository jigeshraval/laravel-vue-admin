<template>
    <div>
        <v-form id="manufacturerAdd" ref="manufacturerAdd" @submit.prevent="mAdd">
            <Header
              :heading="getHeading()"
            >
                <v-switch
                    v-model="manufacturer.status"
                    inset
                    hide-details
                    class="mr-8"
                    color="success"
                    :value="manufacturer.status"
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
                    to="/manufacturers"
                    color="info"
                >
                    <v-icon left>mdi-view-list</v-icon>
                    List
                </v-btn>
            </Header>
          <v-layout class="row wrap">
            <v-flex class="col sm9 xs12 md9 xl9">
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
                            v-model="manufacturer.name"
                            label="Name*"
                            name="name"
                            required
                            :rules="validateRules"
                            persistent-hint
                            autocomplete="nope"
                        ></v-text-field>
                        <v-text-field
                            v-model="manufacturer.url"
                            label="URL*"
                            name="url"
                            required
                            :rules="validateRules"
                            autocomplete="nope"
                        ></v-text-field>
                        <v-text-field
                            v-model="manufacturer.email"
                            label="Email"
                            type="email"
                            name="email"
                            autocomplete="nope"
                        ></v-text-field>
                        <Geo
                            label="Location"
                            id="location"
                            :value="manufacturer"
                        >
                        </Geo>
                        <v-text-field
                            v-model="manufacturer.phone"
                            label="Phone"
                            length="15"
                            maxlength="15"
                            type="tel"
                            name="phone"
                            persistent-hint
                            autocomplete="nope"
                        ></v-text-field>
                        <v-text-field
                            v-model="manufacturer.website"
                            label="Website"
                            type="url"
                            name="website"
                            persistent-hint
                            autocomplete="nope"
                        ></v-text-field>
                        <Textarea
                            autocomplete="nope"
                            outlined
                            name="about"
                            label="About"
                            :value="manufacturer.about"
                        ></Textarea>

                        <v-divider></v-divider>
                        <div class="flex mt-3">
                            <v-switch
                                v-model="manufacturer.preferred"
                                inset
                                class="mr-5"
                                color="success"
                                :value="manufacturer.preferred"
                                label="Preferred Manufacturer"
                                name="preferred"
                            ></v-switch>

                            <v-switch
                                v-model="manufacturer.out_of_business"
                                inset
                                color="success"
                                :value="manufacturer.out_of_business"
                                label="Out of business"
                                name="out_of_business"
                            ></v-switch>
                        </div>
                    </v-tab-item>

                    <v-tab-item class="pa-5" :eager="true">
                      <SEO
                         :seo="manufacturer"
                      >
                      </SEO>
                    </v-tab-item>
                  </v-tabs>

              </v-card>
            </v-flex>
            <div class="col xs12 sm3 md3 xl3">
              <v-expansion-panels
                    v-model="panel"
                    accordion
              >

                <v-expansion-panel class="_collapse">
                  <v-expansion-panel-header>Type of Equipment</v-expansion-panel-header>
                  <v-expansion-panel-content :eager="true">
                    <div
                      v-for="item in manufacturer.equipment_type"
                      :key="item.id"
                    >
                      <v-checkbox
                        hide-details
                        name="type[]"
                        :value="item.id"
                        v-model="manufacturer.selected_type"
                        :label="item.name"
                      ></v-checkbox>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel class="_collapse">
                    <v-expansion-panel-header>Categories</v-expansion-panel-header>
                    <v-expansion-panel-content :eager="true">
                      <v-checkbox
                        v-for="(cat, i) in manufacturer.equipment_category"
                        :key="i"
                        hide-details
                        :value="cat.id"
                        name="categories[]"
                        v-model="manufacturer.selected_category"
                        :label="cat.name"
                      ></v-checkbox>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                 <v-expansion-panel class="_collapse">
                    <v-expansion-panel-header>Profile Image</v-expansion-panel-header>
                    <v-expansion-panel-content :eager="true">
                        <File
                            block
                            cls="_block"
                            text="Choose Image"
                            name="id_profile_image"
                            :value="manufacturer.profile_image"
                            :multiple="false"
                        ></File>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel class="_collapse">
                    <v-expansion-panel-header>Hero Image</v-expansion-panel-header>
                    <v-expansion-panel-content :eager="true">
                        <File
                            block
                            cls="_block"
                            :value="manufacturer.hero_img"
                            text="Choose Image"
                            name="id_hero_img"
                            :multiple="false"
                        ></File>
                    </v-expansion-panel-content>
                </v-expansion-panel>

              </v-expansion-panels>
            </div>
          </v-layout>
      </v-form>
    </div>
</template>
<script>
import Vue from 'vue'
  export default {
    beforeCreate() {
      var url = '/manufacturer/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/manufacturer/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
            this.manufacturer = res.data.manufacturer;
      });
    },
    data () {
      return {
        manufacturer: [],
        type: [],
        added: false,
        category: [],
        validateRules: [
          v => !!v || 'This field is required'
        ],
        emailRules: [
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        panel: 0
      }
    },
    watch : {
      '$route.query.added' : function (val) {
          this.getData();
      }
    },
    methods: {
        getHeading () {
            if (this.manufacturer && this.manufacturer.name) {
                return 'Manufacturer: ' + this.manufacturer.name;
            }

            return 'Add Manufacturer';
        },
      mAdd () {
        if (this.$refs.manufacturerAdd.validate() == false) {
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
        var fd = new FormData(this.$refs.manufacturerAdd.$el);
        var url = '/manufacturer/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/manufacturer/edit/' + this.$router.history.current.params.id;
        }
        this.$axiosx.post(url, fd).then((res) => {
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
      addedManufacturer() {
        if (this.$router.history.current.query.added == 'true') {
          this.$store.commit('snackbar', {
            status: 'success',
            text: 'Manufacturer Added Successfully'
          });
        }
      },
      getData () {
          if (this.$route.params && this.$route.params.id) {
            var url = '/manufacturer/edit/' + this.$route.params.id;
            return this.$axiosx.get(url)
            .then((res) => {
                this.manufacturer = res.data.manufacturer;
            });
        }
      }
    }
  }
</script>
