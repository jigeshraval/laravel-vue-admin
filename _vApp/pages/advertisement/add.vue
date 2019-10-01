<template>
    <div>
        <v-form id="AdvertisementAdd" ref="AdvertisementAdd" @submit.prevent="adverAdd" autocomplete="nope">
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
                      to="/advertisement"
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
                          v-model="ad.name"
                          label="Name*"
                          name="name"
                          required
                          :rules="validateRules"
                          autocomplete="nope"
                        ></v-text-field>

                        <v-text-field
                          v-model="ad.url"
                          label="Url*"
                          name="url"
                          required
                          :rules="validateRules"
                          autocomplete="nope"
                        ></v-text-field>

                        <Textarea
                            autocomplete="nope"
                            outlined
                            name="short_description"
                            label="Short Description"
                            :value="ad.short_description"
                        ></Textarea>

                    </v-card>
                </v-flex>
                <div class="col xs12 sm3 md3 xl3">
                  <v-expansion-panels
                        v-model="panel"
                        accordion
                  >
                    <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>Image</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                            <File
                                block
                                cls="_block"
                                :value="ad.image"
                                text="Choose Image"
                                name="id_image"
                                :multiple="false"
                            ></File>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="_collapse">
                        <v-expansion-panel-header>Video</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                            <File
                                block
                                cls="_block"
                                :value="ad.video"
                                text="Choose Video"
                                name="id_video"
                                type="video"
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
    var url = '/advertisement/add';
    if (this.$router.history.current.params && this.$router.history.current.params.id) {
      url = '/advertisement/edit/' + this.$router.history.current.params.id;
    }
    return this.$axiosx.get(url)
    .then((res) => {
      this.ad = res.data.ad;
      this.actions = res.data.actions;
    });
  },
  data () {
    return {
      ad: [],
      actions: [],
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
            var url = '/advertisement/edit/' + this.$route.params.id;
            return this.$axiosx.get(url)
            .then((res) => {
                this.ad = res.data.ad;
            });
        }
    },
    getHeading () {
        if (this.ad && this.ad.name) {
              return 'Advertisement: ' + this.ad.name;
        }

        return 'Add Advertisement';
    },
    adverAdd () {
        if (this.$refs.AdvertisementAdd.validate() == false) {
            this.$store.commit('snackbar', {
              status: 'error',
              text: 'Please supply mandatory fields.'
            });
            return true;
        }
      var fd = new FormData(this.$refs.AdvertisementAdd.$el);
      var url = '/advertisement/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/advertisement/edit/' + this.$router.history.current.params.id;
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
      this.$refs.AdvertisementAdd.submit();
    },
    addedManufacturer() {
      if (this.$router.history.current.query.added == 'true') {
        this.$store.commit('snackbar', {
          status: 'success',
          text: 'Advertisement Added Successfully'
        });
      }
    },
  }
}
</script>
