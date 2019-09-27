<template>
    <div>
        <v-form id="EmployeeForm" ref="EmployeeForm" @submit.prevent="employeeAdd" autocomplete="nope">
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
                      v-model="e.name"
                      label="Name*"
                      name="name"
                      required
                      :rules="validateRules"
                      autocomplete="nope"
                    ></v-text-field>

                    <v-text-field
                      v-model="e.email"
                      label="Email*"
                      name="email"
                      required
                      :rules="validateRules"
                      autocomplete="nope"
                    ></v-text-field>

                    <v-text-field
                        autocomplete="nope"
                        label="Password*"
                        required
                        :rules="validateRules"
                        name="password"
                        type="password"
                        v-model="e.password"
                    ></v-text-field>

                    <v-text-field
                        autocomplete="nope"
                        label="Confirm Password*"
                        required
                        :rules="validateRules"
                        name="password_confirmation"
                        type="password"
                        v-model="e.password_confirmation"
                    ></v-text-field>
               </v-card>

              </v-flex>
              <v-flex class="col sm12 xs12 md3 xl3">
                <div justify="center" class="full">
                  <v-expansion-panels accordion>

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>User Access Permission</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                          <div
                            v-for="item in adminMenu"
                            :key="item.id"
                          >
                            <v-checkbox
                              hide-details
                              name="permission[]"
                              :value="item.id"
                              v-model="selectedAdminMenu"
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
export default {
  beforeCreate() {
    var url = '/employee/add';
    if (this.$router.history.current.params && this.$router.history.current.params.id) {
      url = '/employee/edit/' + this.$router.history.current.params.id;
    }
    return this.$axiosx.get(url)
    .then((res) => {
      this.e = res.data.employee;
      this.actions = res.data.actions;
      this.adminMenu = res.data.adminMenu;
      this.selectedAdminMenu = res.data.selected_admin_menu;
    });
  },
  data () {
    return {
      e: [],
      actions: [],
      adminMenu: [],
      selectedAdminMenu: [],
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
    employeeAdd () {
      var fd = new FormData(this.$refs.EmployeeForm.$el);

      if (!this.$router.history.current.params && !this.$router.history.current.params.id) {
        if (this.$refs.EmployeeForm.validate() == false) {
              this.$store.commit('snackbar', {
                  status: 'error',
                  text: 'Please supply mandatory fields'
              });
              return true;
        }
      }

      var url = '/employee/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/employee/edit/' + this.$router.history.current.params.id;
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
          text: 'Employee Added Successfully'
        });
      }
    },
    getData () {
        if (this.$route.params && this.$route.params.id) {
          var url = '/employee/edit/' + this.$route.params.id;
          return this.$axiosx.get(url)
          .then((res) => {
              this.e = res.data.employee;
              this.actions = res.data.actions;
              this.adminMenu = res.data.adminMenu;
              this.selectedAdminMenu = res.data.selected_admin_menu;
          });
        }
    }
  }
}
</script>
