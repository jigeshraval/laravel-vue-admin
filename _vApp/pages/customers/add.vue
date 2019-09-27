<template>
    <div>
        <v-form id="CustomerForm" ref="CustomerForm" @submit.prevent="customerAdd" autocomplete="nope">
            <Header
              :heading="actions.heading"
            >
              <v-btn
                  :to="actions.slug"
                  color="info"
              >
                  <v-icon left>mdi-view-list</v-icon>
                  list
              </v-btn>
            </Header>
            <v-layout row wrap>
              <v-card class="pa-5 full">
                <v-text-field
                  v-model="customer.first_name"
                  label="First Name*"
                  name="first_name"
                  required
                  :rules="validateRules"
                  autocomplete="nope"
                ></v-text-field>

                <v-text-field
                  v-model="customer.last_name"
                  label="Last Name*"
                  name="last_name"
                  required
                  :rules="validateRules"
                  autocomplete="nope"
                ></v-text-field>

                <v-text-field
                  v-model="customer.email"
                  label="Email*"
                  name="email"
                  type="email"
                  required
                  :rules="emailRules"
                  autocomplete="nope"
                ></v-text-field>

                <v-text-field
                  v-model="customer.mobile"
                  label="Mobile*"
                  name="mobile"
                  type="tel"
                  maxlength="10"
                  length="10"
                  required
                  :rules="validateRules"
                  autocomplete="nope"
                ></v-text-field>

                <v-text-field
                  v-model="customer.password"
                  label="Password*"
                  name="password"
                  type="password"
                  autocomplete="nope"
                ></v-text-field>

                <div id="_bottomAction">
                    <div class="flex">
                      <v-switch
                        v-model="customer.status"
                        inset
                        color="success"
                        :value="customer.status"
                        label="Status"
                        name="status"
                      ></v-switch>
                      <v-switch
                        v-model="customer.free_membership"
                        inset
                        class="ml-5"
                        color="success"
                        :value="customer.free_membership"
                        label="Free Membership"
                        name="free_membership"
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
    var url = '/customer/add';
    if (this.$router.history.current.params && this.$router.history.current.params.id) {
      url = '/customer/edit/' + this.$router.history.current.params.id;
    }
    return this.$axiosx.get(url)
    .then((res) => {
      this.customer = res.data.customer;
      this.actions = res.data.actions;
      if (this.customer.status == 0) {
        this.customer.status == false;
      } else {
        this.customer.status == true;
      }

      if (this.customer.free_membership == 0) {
        this.customer.free_membership == false;
      } else {
        this.customer.free_membership == true;
      }

    });
  },
  data () {
    return {
      customer: {
        status: false,
        free_membership: false
      },
      actions: [],
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
    },
  methods: {
    customerAdd () {
      var fd = new FormData(this.$refs.CustomerForm.$el);
      this.dialog = true;
      var url = '/customer/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/customer/edit/' + this.$router.history.current.params.id;
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
    getData() {
        if (this.$route.params && this.$route.params.id) {
          var url = '/customer/edit/' + this.$route.params.id;
          return this.$axiosx.get(url)
          .then((res) => {
            this.customer = res.data.customer;
            this.actions = res.data.actions;
            if (this.customer.status == 0) {
                this.customer.status == false;
            } else {
                this.customer.status == true;
            }

            if (this.customer.free_membership == 0) {
                this.customer.free_membership == false;
            } else {
                this.customer.free_membership == true;
            }
          });
        }
    },
    added() {
      if (this.$router.history.current.query.added == 'true') {
        this.$store.commit('snackbar', {
          status: 'success',
          text: 'Customer Added Successfully'
        });
      }
    }
  }
}
</script>
