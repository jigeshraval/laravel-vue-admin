<template>
    <div>
        <v-form id="PushNotificationForm" ref="PushNotificationForm" @submit.prevent="pnAdd" autocomplete="nope">
            <Header
              :heading="getHeading()"
            >

            <v-switch
              v-model="pn.status"
              hide-details
              class="mr-8"
              inset
              name="status"
              label="Status"
              color="success"
              :value="pn.status"
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
                  to="/push/notification"
                  color="info"
              >
                  <v-icon left>mdi-view-list</v-icon>
                  list
              </v-btn>
            </Header>
            <v-layout row wrap>
              <v-flex class="col sm9 xs12 md9 xl9">
                <v-card class="pa-5 full">
                  <v-text-field
                    v-model="pn.title"
                    label="Title*"
                    name="title"
                    required
                    :rules="validateRules"
                  ></v-text-field>

                  <v-text-field
                    :rules="validateRules"
                    required
                    v-model="pn.body"
                    label="Body*"
                    name="body"
                    autocomplete="nope"
                  ></v-text-field>

                  <v-text-field
                    required
                    type="url"
                    :rules="validateRules"
                    v-model="pn.target_url"
                    label="Target URL*"
                    name="target_url"
                    autocomplete="nope"
                  ></v-text-field>

                </v-card>
              </v-flex>
              <div class="col xs12 sm3 md3 xl3">
                <v-expansion-panels accordion
                v-model="panel">

                    <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>Media</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                            <File
                                block
                                cls="_block"
                                :value="pn.media"
                                text="Choose Image"
                                name="id_media"
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
export default {
  beforeCreate() {
    var url = '/push/notification/add';
    if (this.$router.history.current.params && this.$router.history.current.params.id) {
      url = '/push/notification/edit/' + this.$router.history.current.params.id;
    }
    return this.$axiosx.get(url)
    .then((res) => {
      this.pn = res.data.pn;
    });
  },
  data () {
    return {
      pn: [],
      panel: 0,
      validateRules: [
        v => !!v || 'This field is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      error: {
        'status': 'error',
        'text': 'Please Supply mandatory fields'
      }
    }
  },
    watch : {
      '$route.query.added' : function (val) {
          this.getData();
      }
    },
    methods: {
        getHeading () {
            if (this.pn && this.pn.title) {
                return 'Push Notification: ' + this.pn.title;
            }

            return 'Add Push Notification';
        },
        pnAdd () {
          if (this.$refs.PushNotificationForm.validate() == false) {
            this.$store.commit('snackbar', this.error);
            return true;
          }

          var fd = new FormData(this.$refs.PushNotificationForm.$el);
          var url = '/push/notification/add';
          if (this.$router.history.current.params && this.$router.history.current.params.id) {
            url = '/push/notification/edit/' + this.$router.history.current.params.id;
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
              text: 'Equipment options Added Successfully'
            });
          }
        },
        getData() {
            if (this.$route.params && this.$route.params.id) {
              var url = '/push/notification/edit/' + this.$route.params.id;
              return this.$axiosx.get(url)
              .then((res) => {
                this.pn = res.data.pn;
              });
            }
        }
    }
}
</script>
