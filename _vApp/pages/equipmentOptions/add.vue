<template>
    <div>
        <v-form id="EquipmentOptionsAdd" ref="EquipmentOptionsAdd" @submit.prevent="eoAdd" autocomplete="nope">
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
                  to="/equipment/options"
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
                    v-model="eo.name"
                    label="Name*"
                    name="name"
                    required
                    :rules="validateRules"
                    autocomplete="nope"
                  ></v-text-field>

                  <v-text-field
                    v-model="eo.identifier"
                    label="Identifier"
                    name="identifier"
                    autocomplete="nope"
                  ></v-text-field>

                  <v-text-field
                    v-model="eo.measurement_name"
                    label="Measurement Name"
                    name="measurement_name"
                    autocomplete="nope"
                  ></v-text-field>

                  <v-text-field
                    v-model="eo.equipment_primary_data_order"
                    label="Equipment Primary Data Order"
                    name="equipment_primary_data_order"
                    autocomplete="nope"
                  ></v-text-field>

                  <Textarea
                      autocomplete="nope"
                      outlined
                      name="description"
                      label="Description"
                      :value="eo.description"
                  ></Textarea>

                  <v-text-field
                    v-model="eo.position"
                    label="Position"
                    name="position"
                    autocomplete="nope"
                  ></v-text-field>

                </v-card>
              </v-flex>
              <div class="col xs12 sm3 md3 xl3">
                <v-expansion-panels accordion
                v-model="panel">
                  <v-expansion-panel class="_collapse">
                    <v-expansion-panel-header>Input Type</v-expansion-panel-header>
                    <v-expansion-panel-content :eager="true">
                      <v-radio-group v-model="eo.input_type" :mandatory="false">
                        <v-radio
                          :label="item.name"
                          :value="item.id"
                          name="input_type"
                          v-for="item in eo.inputType"
                          :key="item.id"
                        ></v-radio>
                      </v-radio-group>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel class="_collapse">
                    <v-expansion-panel-header>Filterable</v-expansion-panel-header>
                    <v-expansion-panel-content :eager="true">
                      <v-radio-group v-model="eo.filterable" :mandatory="false">
                        <v-radio
                          :label="item.name"
                          :value="item.id"
                          name="filterable"
                          v-for="item in eo.options"
                          :key="item.id"
                        ></v-radio>
                      </v-radio-group>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel class="_collapse">
                    <v-expansion-panel-header>Usage In Combinations</v-expansion-panel-header>
                    <v-expansion-panel-content :eager="true">
                      <v-radio-group v-model="eo.usage_in_combinations" :mandatory="false">
                        <v-radio
                          :label="item.name"
                          :value="item.id"
                          name="usage_in_combinations"
                          v-for="item in eo.options"
                          :key="item.id"
                        ></v-radio>
                      </v-radio-group>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel class="_collapse">
                    <v-expansion-panel-header>Usage In Comparison</v-expansion-panel-header>
                    <v-expansion-panel-content :eager="true">
                      <v-radio-group v-model="eo.usage_in_comparison" :mandatory="false">
                        <v-radio
                          :label="item.name"
                          :value="item.id"
                          name="usage_in_comparison"
                          v-for="item in eo.options"
                          :key="item.id"
                        ></v-radio>
                      </v-radio-group>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel class="_collapse">
                    <v-expansion-panel-header>Is Global</v-expansion-panel-header>
                    <v-expansion-panel-content :eager="true">
                      <v-radio-group v-model="eo.is_global" :mandatory="false">
                        <v-radio
                          :label="item.name"
                          :value="item.id"
                          name="is_global"
                          v-for="item in eo.options"
                          :key="item.id"
                        ></v-radio>
                      </v-radio-group>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel class="_collapse">
                    <v-expansion-panel-header>Is Required</v-expansion-panel-header>
                    <v-expansion-panel-content :eager="true">
                      <v-radio-group v-model="eo.is_required" :mandatory="false">
                        <v-radio
                          :label="item.name"
                          :value="item.id"
                          name="is_required"
                          v-for="item in eo.options"
                          :key="item.id"
                        ></v-radio>
                      </v-radio-group>
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
    var url = '/equipment/options/add';
    if (this.$router.history.current.params && this.$router.history.current.params.id) {
      url = '/equipment/options/edit/' + this.$router.history.current.params.id;
    }
    return this.$axiosx.get(url)
    .then((res) => {
      this.eo = res.data.eo;

      if (this.eo.usage_in_combinations) {
        this.eo.usage_in_combinations = '1';
      } else {
        this.eo.usage_in_combinations = '0';
      }

      if (this.eo.filterable) {
        this.eo.filterable = '1';
      } else {
        this.eo.filterable = '0';
      }

      if (this.eo.usage_in_comparison) {
        this.eo.usage_in_comparison = '1';
      } else {
        this.eo.usage_in_comparison = '0';
      }

      if (this.eo.is_global) {
        this.eo.is_global = '1';
      } else {
        this.eo.is_global = '0';
      }

      if (this.eo.is_required) {
        this.eo.is_required = '1';
      } else {
        this.eo.is_required = '0';
      }

    });
  },
  watch : {
    '$route.query.added' : function (val) {
        this.getData();
    }
  },
  data () {
    return {
      inputType: [],
      eo: [],
      actions: [],
      options: [],
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
  methods: {
      getHeading() {
          if (this.eo && this.eo.name) {
              return 'Option: ' + this.eo.name;
          }
          return 'Add Option';
      },
    eoAdd () {
        if (this.$refs.EquipmentOptionsAdd.validate() == false) {
          this.$store.commit('snackbar', {
            status: 'error',
            text: 'Please supply mandatory fields.'
          });
          return true;
        }

      if (this.$refs.EquipmentOptionsAdd.validate() == false) {
        this.$store.commit('snackbar', this.error);
        return true;
      }

      var fd = new FormData(this.$refs.EquipmentOptionsAdd.$el);
      var url = '/equipment/options/add';
      if (this.$router.history.current.params && this.$router.history.current.params.id) {
        url = '/equipment/options/edit/' + this.$router.history.current.params.id;
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
    saveManufacturer () {
      this.$refs.EquipmentOptionsAdd.submit();
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
          var url = '/equipment/options/edit/' + this.$route.params.id;
          return this.$axiosx.get(url)
          .then((res) => {
            this.eo = res.data.eo;
            this.inputType = res.data.input_type;
            this.options = res.data.options;
            this.actions = res.data.actions;

            if (this.eo.usage_in_combinations) {
              this.eo.usage_in_combinations = '1';
            } else {
              this.eo.usage_in_combinations = '0';
            }

            if (this.eo.filterable) {
              this.eo.filterable = '1';
            } else {
              this.eo.filterable = '0';
            }

            if (this.eo.usage_in_comparison) {
              this.eo.usage_in_comparison = '1';
            } else {
              this.eo.usage_in_comparison = '0';
            }

            if (this.eo.is_global) {
              this.eo.is_global = '1';
            } else {
              this.eo.is_global = '0';
            }

            if (this.eo.is_required) {
              this.eo.is_required = '1';
            } else {
              this.eo.is_required = '0';
            }
          });
        }
    }
  }
}
</script>
