<template>
    <div>
        <v-form id="TrustedCustomerAdd" ref="TrustedCustomerAdd" @submit.prevent="tcAdd" autocomplete="nope">
            <Header
              heading="Trusted Customers"
            >
              <v-btn
                  to="/trusted/customers/list"
                  color="info"
              >
                  <v-icon left>mdi-view-list</v-icon>
                  list
              </v-btn>
            </Header>
            <v-layout row wrap>
              <v-card class="pa-5 full">
                <v-text-field
                  v-model="tc.name"
                  label="Title*"
                  name="name"
                  required
                  :rules="validateRules"
                  autocomplete="nope"
                ></v-text-field>

                <v-textarea
                  label="Description"
                  auto-grow
                  name="about"
                  outlined
                  v-model="tc.about"
                ></v-textarea>
                <div id="_bottomAction">
                    <div>
                      <v-switch
                        v-model="tc.status"
                        inset
                        color="success"
                        :value="tc.status"
                        label="Status"
                        name="status"
                      ></v-switch>
                    </div>
                    <v-btn
                        large
                        type="submit"
                        color="info"
                        :loading="$store.state.loading"
                    >
                        <v-icon>mdi-content-save-outline</v-icon>
                        Save
                    </v-btn>
                </div>
              </v-card>
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
    tcAdd () {
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
