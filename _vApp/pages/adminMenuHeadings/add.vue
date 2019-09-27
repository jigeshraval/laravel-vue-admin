<template>
    <div>
        <v-form id="MenuHeadingForm" ref="MenuHeadingForm" @submit.prevent="mhAdd" autocomplete="nope">
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
                  v-model="mh.name"
                  label="Name*"
                  name="name"
                  required
                  :rules="validateRules"
                  autocomplete="nope"
                ></v-text-field>

                <v-text-field
                  v-model="mh.position"
                  label="Position"
                  type="number"
                  name="position"
                  autocomplete="nope"
                ></v-text-field>

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
    var url = '/admin/menu/headings/add';
    if (this.$router.history.current.params && this.$router.history.current.params.id) {
      url = '/admin/menu/headings/edit/' + this.$router.history.current.params.id;
    }
    return this.$axiosx.get(url)
    .then((res) => {
      this.mh = res.data.mh;
      this.actions = res.data.actions;
    });
  },
  data () {
    return {
      mh: [],
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
  watch : {
      '$route.query.added' : function (val) {
          this.getData();
      }
  },
  methods: {
    mhAdd () {
      var fd = new FormData(this.$refs.MenuHeadingForm.$el);
      this.dialog = true;
      var url = '/admin/menu/headings/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/admin/menu/headings/edit/' + this.$router.history.current.params.id;
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
          text: 'Menu Headings Added Successfully'
        });
      }
    },
    getData () {
        if (this.$route.params && this.$route.params.id) {
          var url = '/admin/menu/headings/edit/' + this.$route.params.id;
          return this.$axiosx.get(url)
          .then((res) => {
                this.mh = res.data.mh;
          });
        }
    },
  }
}
</script>
