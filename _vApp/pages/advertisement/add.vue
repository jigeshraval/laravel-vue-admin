<template>
    <div>
        <v-form id="AdvertisementAdd" ref="AdvertisementAdd" @submit.prevent="adverAdd" autocomplete="nope">
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

                <v-textarea
                  label="Short Description"
                  v-model="ad.short_description"
                  auto-grow
                  name="short_description"
                  outlined
                ></v-textarea>

                <div id="_bottomAction">
                    <div>
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
    adverAdd () {
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
    }
  }
}
</script>
