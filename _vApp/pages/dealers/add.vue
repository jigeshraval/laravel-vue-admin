<template>
    <div>
        <v-form id="dealerAdd" ref="dealerAdd" @submit.prevent="dAdd" autocomplete="nope">
            <Header
              heading="Dealer"
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
                    to="/dealer/list"
                    color="info"
                >
                    <v-icon left>mdi-view-list</v-icon>
                    list
                </v-btn>
            </Header>
            <v-layout class="row wrap">
              <v-flex class="col sm12 xs12 md9 xl9">
                <v-card class="pa-5 full">
                  <v-text-field
                    v-model="dealer.name"
                    label="Name*"
                    name="name"
                    required
                    :rules="validateRules"
                    persistent-hint
                    autocomplete="nope"
                  ></v-text-field>

                  <v-text-field
                    v-model="dealer.email"
                    label="Email*"
                    type="email"
                    :rules="emailRules"
                    required
                    name="email"
                    persistent-hint
                    autocomplete="nope"
                  ></v-text-field>

                  <v-layout row wrap>
                    <v-flex col md6 sm6 xs12>
                      <v-text-field
                        v-model="dealer.password"
                        label="Password"
                        type="password"
                        name="password"
                        persistent-hint
                        autocomplete="nope"
                      ></v-text-field>
                    </v-flex>
                    <v-flex col md6 sm6 xs12>
                      <v-text-field
                        v-model="dealer.mobile"
                        label="Phone*"
                        :rules="validateRules"
                        length="10"
                        maxlength="10"
                        type="tel"
                        required
                        name="mobile"
                        autocomplete="nope"
                      ></v-text-field>
                    </v-flex>
                    <v-flex col md6 sm6 xs12>
                      <v-text-field
                        v-model="address.street"
                        label="Street"
                        type="text"
                        name="street"
                        persistent-hint
                        autocomplete="nope"
                      ></v-text-field>
                    </v-flex>
                    <v-flex col md6 sm6 xs12>
                      <v-text-field
                        v-model="address.city"
                        label="City"
                        type="text"
                        name="city"
                        persistent-hint
                        autocomplete="nope"
                      ></v-text-field>
                    </v-flex>
                    <v-flex col md6 sm6 xs12>
                      <v-select
                        :items="states"
                        item-text="name"
                        item-value="id"
                        v-model="dealer.id_state"
                        label="State"
                        autocomplete="nope"
                      ></v-select>
                      <input type="hidden" name="state" :value="dealer.id_state">
                    </v-flex>
                    <v-flex col md6 sm6 xs12>
                      <v-text-field
                        v-model="address.zip"
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
                    auto-grow
                    outlined
                    name="maintenance"
                    label="Recycling Equipment Maintenance"
                    v-model="dealer.maintenance"
                  ></Textarea>

                  <Textarea
                    auto-grow
                    outlined
                    name="parts"
                    label="Baler Replacement Parts"
                    v-model="dealer.parts"
                  ></Textarea>


                  <div class="flex align-center">
                    <v-switch
                      v-model="dealer.free_membership"
                      inset
                      :value="dealer.free_membership"
                      label="Free Membership"
                      color="success"
                      name="free_membership"
                    ></v-switch>

                    <v-switch
                      class="ml-5"
                      v-model="dealer.preferred"
                      :value="dealer.preferred"
                      inset
                      label="Preferred Dealer"
                      color="success"
                      name="preferred"
                    ></v-switch>
                  </div>

                </v-card>
              </v-flex>
              <v-flex class="col sm12 xs12 md3 xl3">
                <div justify="center">
                  <v-expansion-panels accordion>

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Manufacturers</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div
                          v-for="item in manufacturers"
                          :key="item.id"
                        >
                          <v-checkbox
                            hide-details
                            name="manufacturers[]"
                            :value="item.id"
                            v-model="selectedManufacturers"
                            :label="item.name"
                          ></v-checkbox>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>Hero Videos</v-expansion-panel-header>
                      <v-expansion-panel-content>
                          <File
                              block
                              cls="_block"
                              text="Choose Image"
                              name="id_hero_video"
                              type="Video"
                              :multiple="false"
                          ></File>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>Profile Image</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <File
                            block
                            cls="_block"
                            text="Choose Image"
                            name="id_profile_image"
                            :multiple="false"
                        ></File>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>Hero Image</v-expansion-panel-header>
                      <v-expansion-panel-content>
                          <File
                              block
                              cls="_block"
                              text="Choose Image"
                              name="id_hero_image"
                              :multiple="false"
                          ></File>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-flex>
            </v-layout>
          <!-- <div id="_bottomAction">
            <div></div>
            <v-btn
              large
              color="info"
              :loading="$store.state.loading"
            >
            <v-icon>mdi-content-save-outline</v-icon>
            Save
          </v-btn>
        </div> -->
      </v-form>
    </div>
</template>
<script>
import Vue from 'vue'
import LeftColumn from '../../components/LeftColumn.vue'
Vue.component('LeftColumn', LeftColumn)
  export default {
    beforeCreate() {
      var url = '/dealer/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/dealer/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
          this.dealers = res.data.dealers;
          if (this.dealer.free_membership) {
            this.dealer.free_membership == true;
          }

          if (this.dealer.preferred) {
            this.dealer.preferred == true;
          }

          this.selectedManufacturers = res.data.selectedManufacturers;
          this.manufacturers = res.data.manufacturers;
          this.dealer = res.data.dealer;
          this.address = res.data.add;
          this.states = res.data.states;

      });
    },
    data () {
      return {
        dealer: {
          free_membership: false,
          preferred: false,
        },
        address: [],
        selectedManufacturers: [],
        states: [],
        free_membership: false,
        dialog: false,
        category: [],
        preferred_dealer: false,
        selected_category: [],
        selected_type: [],
        manufacturers: [],
        validateRules: [
          v => !!v || 'This field is required'
        ],
        items: [],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ]
      }
    },
    methods: {
      dAdd () {
        if (this.$refs.manufacturerAdd.validate() == false) {
            this.$store.commit('snackbar', {
              status: 'error',
              text: 'Please supply mandatory fields.'
            });
            return true;
        }
        var fd = new FormData(this.$refs.dealerAdd.$el);
        this.dialog = true;
        var url = '/dealer/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/dealer/edit/' + this.$router.history.current.params.id;
        }
        this.$axiosx.post(url, fd).then((res) => {
          if (res.data.status == 'error') {
            this.$store.commit('snackbar', res.data);
            this.dialog = false;
          }

          if (res.data.status == 'redirect') {
            this.$router.push({
              path: res.data.text,
              query: { added: 'true' }
            });
            this.dialog = false;
            this.addedManufacturer();
          }
          if (res.data.status == 'success') {
              this.$store.commit('snackbar', res.data);
              this.dialog = false;
          }
        });
      },
      saveManufacturer () {
        this.$refs.dealerAdd.submit();
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
