<template>
    <div>
        <v-form id="TrustedCustomerAdd" ref="TrustedCustomerAdd" @submit.prevent="tcAdd" autocomplete="nope">
            <Header
              heading="Trusted Customers"
            >
            <v-switch
                hide-details
                class="mr-8"
                v-model="tc.status"
                inset
                color="success"
                :value="tc.status"
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
                  to="/trusted/customers"
                  color="info"
              >
                  <v-icon left>mdi-view-list</v-icon>
                  list
              </v-btn>
            </Header>
            <v-layout row wrap>
                <v-flex class="col sm12 xs12 md9 xl9">
                    <v-card class="pa-5 full">
                        <v-text-field
                          v-model="tc.name"
                          label="Title*"
                          name="name"
                          required
                          :rules="validateRules"
                          autocomplete="nope"
                        ></v-text-field>

                        <Textarea
                            autocomplete="nope"
                            outlined
                            name="about"
                            label="Description"
                            :value="tc.about"
                        ></Textarea>

                    </v-card>
                </v-flex>
                <v-flex class="col sm12 xs12 md3 xl3">
                  <div justify="center" class="full">
                    <v-expansion-panels
                    v-model="panel"
                    accordion
                    >
                      <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>Logo</v-expansion-panel-header>
                          <v-expansion-panel-content :eager="true">
                              <File
                                  block
                                  cls="_block"
                                  :value="tc.logo"
                                  text="Choose Image"
                                  name="id_logo"
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
export default {
  beforeCreate() {
    var url = '/trusted/customers/add';
    if (this.$router.history.current.params && this.$router.history.current.params.id) {
      url = '/trusted/customers/edit/' + this.$router.history.current.params.id;
    }
    return this.$axiosx.get(url)
    .then((res) => {
      this.tc = res.data.tc;
      if (this.tc.status == 0) {
        this.tc.status == false;
      } else {
        this.tc.status == true;
      }
    });
  },
  data () {
    return {
      tc: {
        status: false
      },
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
              var url = '/block/edit/' + this.$route.params.id;
              return this.$axiosx.get(url)
              .then((res) => {
                  this.block = res.data.block;
              });
          }
      },
      getHeading() {
          if (this.tc && this.tc.name) {
              return 'Trusted Customer: ' + this.tc.name;
          }

          return 'Add Trusted Customer';
      },
    tcAdd () {
        if (this.$refs.TrustedCustomerAdd.validate() == false) {
            this.$store.commit('snackbar', {
              status: 'error',
              text: 'Please supply mandatory fields.'
            });
            return true;
        }
      var fd = new FormData(this.$refs.TrustedCustomerAdd.$el);
      this.dialog = true;
      var url = '/trusted/customers/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/trusted/customers/edit/' + this.$router.history.current.params.id;
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
      this.$refs.TrustedCustomerAdd.submit();
    },
    addedManufacturer() {
      if (this.$router.history.current.query.added == 'true') {
        this.$store.commit('snackbar', {
          status: 'success',
          text: 'Trusted Customers Added Successfully'
        });
      }
    }
  }
}
</script>
