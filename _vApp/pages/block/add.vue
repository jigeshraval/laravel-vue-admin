<template>
    <div>
        <v-form id="blockAdd" ref="blockAdd" @submit.prevent="blockAdd" autocomplete="nope">
            <Header
              :heading="getHeading()"
            >
                <v-switch
                  v-model="block.status"
                  hide-details
                  class="mr-8"
                  inset
                  name="status"
                  label="Status"
                  color="success"
                  :value="block.status"
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
                  to="/block"
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

                   <Textarea
                       autocomplete="nope"
                       outlined
                       name="content"
                       label="Content"
                       :value="block.content"
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
                      <v-expansion-panel-header>Image</v-expansion-panel-header>
                        <v-expansion-panel-content :eager="true">
                            <File
                                block
                                cls="_block"
                                :value="block.image"
                                text="Choose Image"
                                name="id_image"
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
      var url = '/block/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/block/edit/' + this.$router.history.current.params.id;
      }
      return this.$axiosx.get(url)
      .then((res) => {
        this.block = res.data.block;
      });
    },
    data () {
      return {
        block: [],
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
            if (this.block && this.block.name) {
                return 'Block: ' + this.block.name;
            }

            return 'Add Block';
        },
      blockAdd () {
        if (this.$refs.blockAdd.validate() == false) {
            this.$store.commit('snackbar', {
              status: 'error',
              text: 'Please supply mandatory fields.'
            });
            return true;
        }
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
