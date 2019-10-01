<template>
    <div>
        <v-form id="planAdd" ref="planAdd" @submit.prevent="planAdd" autocomplete="nope">
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
                  to="/plans"
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
                        v-model="plans.name"
                        label="Name*"
                        name="name"
                        required
                        :rules="validateRules"
                        autocomplete="nope"
                      ></v-text-field>

                      <Textarea
                          autocomplete="nope"
                          outlined
                          name="description"
                          label="Description*"
                          :value="plans.description"
                      ></Textarea>

                      <v-text-field
                        v-model="plans.duration"
                        label="Duration*"
                        type="number"
                        suffix="MO"
                        length="3"
                        maxlength="3"
                        required
                        :rules="validateRules"
                        name="duration"
                        autocomplete="nope"
                      ></v-text-field>

                      <v-text-field
                        v-model="plans.price"
                        label="Price*"
                        type="tel"
                        required
                        prefix="$"
                        :rules="validateRules"
                        name="price"
                        autocomplete="nope"
                      ></v-text-field>

                      <v-text-field
                        v-model="plans.icon"
                        label="Icon*"
                        type="tel"
                        required
                        :rules="validateRules"
                        name="icon"
                        autocomplete="nope"
                      ></v-text-field>

                      <v-text-field
                        v-model="plans.position"
                        label="Position*"
                        type="tel"
                        required
                        :rules="validateRules"
                        name="position"
                        autocomplete="nope"
                      ></v-text-field>
                  </v-card>

                </v-flex>
                <v-flex class="col sm12 xs12 md3 xl3">
                  <div justify="center" class="full">
                    <v-expansion-panels
                    accordion
                    v-model="panel">

                      <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>Is Featured</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                          <v-radio-group v-model="plans.is_featured">
                            <v-radio
                              :label="item.name"
                              :value="item.id"
                              name="is_featured"
                              v-for="item in plans.featured"
                              :key="item.id"
                            ></v-radio>
                          </v-radio-group>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                      <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>For</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                          <v-radio-group v-model="plans.for" :mandatory="false">
                            <v-radio
                              :label="item.name"
                              :value="item.id"
                              name="for"
                              v-for="item in plans.fors"
                              :key="item.id"
                            ></v-radio>
                          </v-radio-group>
                        </v-expansion-panel-content>
                      </v-expansion-panel>


                    </v-expansion-panels>
                  </div>
                </v-flex>
            </v-layout>
            </v-card>
      </v-form>
    </div>
</template>
<script>
  export default {
    beforeCreate() {
      var url = '/plans/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/plans/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
        this.plans = res.data.plans;
      });
    },
    data () {
      return {
        plans: [],
        validateRules: [
          v => !!v || 'This field is required'
        ],
        panel: 0,
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
              var url = '/plans/edit/' + this.$route.params.id;
              return this.$axiosx.get(url)
              .then((res) => {
                  this.plans = res.data.plans;
              });
          }
      },
      getHeading () {
          if (this.ad && this.ad.name) {
                return 'Plans: ' + this.ad.name;
          }

          return 'Add Plans';
      },
      planAdd () {
        if (this.$refs.planAdd.validate() == false) {
              this.$store.commit('snackbar', {
                status: 'error',
                text: 'Please supply mandatory fields.'
              });
              return true;
        }
        var fd = new FormData(this.$refs.planAdd.$el);
        this.dialog = true;
        var url = '/plans/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/plans/edit/' + this.$router.history.current.params.id;
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
            text: 'Plan Added Successfully'
          });
        }
      }
    }
  }
</script>
