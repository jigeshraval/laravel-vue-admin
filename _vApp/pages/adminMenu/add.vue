<template>
    <div>
        <v-form id="adminMenuForm" ref="adminMenuForm" @submit.prevent="menuAdd" autocomplete="nope">
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
                <v-card class="full px-5 py-3">
                    <v-text-field
                      v-model="menu.name"
                      label="Name*"
                      name="name"
                      required
                      :rules="validateRules"
                      autocomplete="nope"
                    ></v-text-field>

                    <v-text-field
                      v-model="menu.position"
                      label="position"
                      type="number"
                      name="position"
                      autocomplete="nope"
                    ></v-text-field>
               </v-card>

              </v-flex>
              <v-flex class="col sm12 xs12 md3 xl3">
                <div justify="center" class="full">
                  <v-expansion-panels accordion>

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Menu Headings</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                          <v-radio-group v-model="menu.id_head" :mandatory="false">
                            <v-radio
                              :label="item.name"
                              :value="item.id"
                              name="id_head"
                              v-for="item in heading"
                              :key="item.id"
                            ></v-radio>
                          </v-radio-group>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Slug</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                          <v-radio-group v-model="menu.slug" :mandatory="false">
                            <v-radio
                              :label="item"
                              :value="item"
                              name="slug"
                              v-for="item in allSlug"
                              :key="item"
                            ></v-radio>
                          </v-radio-group>
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
  export default {
    beforeCreate() {
      var url = '/admin/menu/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/admin/menu/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
        this.menu = res.data.menu;
        this.actions = res.data.actions;
        this.allSlug = res.data.allSlug;
        this.heading = res.data.heading;
      });
    },
    data () {
      return {
        menu: [],
        allSlug: [],
        actions: [],
        heading: [],
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
      menuAdd () {
        var fd = new FormData(this.$refs.adminMenuForm.$el);
        this.dialog = true;
        var url = '/admin/menu/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/admin/menu/edit/' + this.$router.history.current.params.id;
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
            text: 'Menu Added Successfully'
          });
        }
      },
      getData () {
          if (this.$route.params && this.$route.params.id) {
            var url = '/admin/menu/edit/' + this.$route.params.id;
            return this.$axiosx.get(url)
            .then((res) => {
                this.menu = res.data.menu;
                this.actions = res.data.actions;
                this.allSlug = res.data.allSlug;
                this.heading = res.data.heading;
            });
          }
      },
    }
  }
</script>
