<template>
    <div>
        <v-form id="EmailsForm" ref="EmailsForm" @submit.prevent="emailsAdd" autocomplete="nope">
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
                    to="/emails"
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
                      v-model="emails.subject"
                      label="Subject*"
                      name="subject"
                      required
                      :rules="validateRules"
                      autocomplete="nope"
                    ></v-text-field>

                    <v-text-field
                      v-model="emails.identifier"
                      label="Identifier*"
                      name="identifier"
                      required
                      :rules="validateRules"
                      autocomplete="nope"
                    ></v-text-field>

                    <Textarea
                        autocomplete="nope"
                        outlined
                        name="content"
                        label="Content*"
                        :value="emails.content"
                        :rules="validateRules"
                    ></Textarea>

                    <Textarea
                        autocomplete="nope"
                        outlined
                        name="sms"
                        label="sms"
                        :value="emails.sms"
                    ></Textarea>

               </v-card>

              </v-flex>
              <v-flex class="col sm12 xs12 md3 xl3">
                <div justify="center" class="full">
                  <v-expansion-panels
                  accordion
                  v-model="panel">

                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Components</v-expansion-panel-header>
                      <v-expansion-panel-content :eager="true">
                        <v-radio-group v-model="emails.id_component">
                          <v-radio
                            :label="item.name"
                            :value="item.id"
                            name="id_component"
                            v-for="item in emails.component"
                            :key="item.id"
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
export default {
  beforeCreate() {
    var url = '/email/add';
    if (this.$router.history.current.params && this.$router.history.current.params.id) {
      url = '/email/edit/' + this.$router.history.current.params.id;
    }
    return this.$axiosx.get(url)
    .then((res) => {
      this.emails = res.data.emails;
    });
  },
  data () {
    return {
      emails: [],
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
      getHeading() {
          if (this.emails && this.emails.subject) {
              return 'Email: ' + this.emails.subject;
          }

          return 'Add Email';
      },
    emailsAdd () {
        if (this.$refs.EmailsForm.validate() == false) {
            this.$store.commit('snackbar', {
                status: 'error',
                text: 'Please supply mandatory fields.'
            });
            return true;
        }
      var fd = new FormData(this.$refs.EmailsForm.$el);

      if (this.$refs.EmailsForm.validate() == false) {
        this.$store.commit('snackbar', {
          status: 'error',
          text: 'Please supply mandatory fields'
        });
        return true;
      }

      var url = '/email/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/email/edit/' + this.$router.history.current.params.id;
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
          text: 'Email Added Successfully'
        });
      }
    },
    getData () {
        if (this.$route.params && this.$route.params.id) {
          var url = '/email/edit/' + this.$route.params.id;
          return this.$axiosx.get(url)
          .then((res) => {
              this.emails = res.data.emails;
          });
        }
    }
  }
}
</script>
