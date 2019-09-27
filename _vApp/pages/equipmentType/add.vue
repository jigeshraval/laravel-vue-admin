<template>
    <div>
        <v-form id="equipmentTypeAdd" ref="equipmentTypeAdd" @submit.prevent="etAdd" autocomplete="nope">
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

                   <v-tab-item class="pa-5">
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

                     <v-textarea
                       label="Description"
                       auto-grow
                       name="description"
                       outlined
                       v-model="et.description"
                     ></v-textarea>

                     <v-textarea
                       label="Accordion"
                       auto-grow
                       name="seo_content"
                       outlined
                       v-model="et.seo_content"
                     ></v-textarea>

                   </v-tab-item>

                   <v-tab-item class="pa-5">
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
                  <v-expansion-panels accordion>

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Tie Options</v-expansion-panel-header>
                      <v-expansion-panel-content  :eager="true">
                        <div
                          v-for="item in options"
                          :key="item.id"
                        >
                          <v-checkbox
                            hide-details
                            name="tie_options[]"
                            :value="item.id"
                            v-model="selectedOptions"
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
import LeftColumn from '../../components/LeftColumn.vue'
Vue.component('LeftColumn', LeftColumn)

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
        console.log(res.data);
        this.et = res.data.equipmentType;
        this.actions = res.data.actions;
        this.options = res.data.options;
        this.selectedOptions = res.data.selectedOptions;
      });
    },
    data () {
      return {
        et: [],
        options: [],
        actions: [],
        selectedOptions: [],
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
      etAdd () {
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
