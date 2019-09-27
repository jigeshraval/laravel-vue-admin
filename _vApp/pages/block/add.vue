<template>
    <div>
        <v-form id="blockAdd" ref="blockAdd" @submit.prevent="blockAdd" autocomplete="nope">
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
                <v-card class="full pa-5">
                   <v-text-field
                     v-model="block.name"
                     label="Name*"
                     name="name"
                     required
                     :rules="validateRules"
                     autocomplete="nope"
                   ></v-text-field>

                   <v-text-field
                     v-model="block.identifier"
                     label="Identifier*"
                     type="text"
                     required
                     :rules="validateRules"
                     name="identifier"
                     autocomplete="nope"
                   ></v-text-field>

                   <v-textarea
                     auto-grow
                     outlined
                     name="content"
                     label="Content"
                     v-model="block.content"
                   ></v-textarea>

                  <v-switch
                    v-model="block.status"
                    inset
                    name="status"
                    label="Status"
                    color="success"
                    :value="block.status"
                  ></v-switch>
                </v-card>
              </v-flex>
              <v-flex class="col sm12 xs12 md3 xl3">
                <div justify="center" class="full">
                  <v-expansion-panels accordion>
                    <v-expansion-panel class="_collapse">
                      <v-expansion-panel-header>Hero Image</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Hero Image
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
      var url = '/block/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/block/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
        this.block = res.data.block;
        this.actions = res.data.actions;
      });
    },
    data () {
      return {
        block: [],
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
      blockAdd () {
        var fd = new FormData(this.$refs.blockAdd.$el);
        this.dialog = true;
        var url = '/block/add';
        if (this.$router.history.current.params && this.$router.history.current.params.id) {
          url = '/block/edit/' + this.$router.history.current.params.id;
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
        this.$refs.blockAdd.submit();
      },
      addedManufacturer() {
        if (this.$router.history.current.query.added == 'true') {
          this.$store.commit('snackbar', {
            status: 'success',
            text: 'Block Added Successfully'
          });
        }
      }
    }
  }
</script>
