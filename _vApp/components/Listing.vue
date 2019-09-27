<template>
    <div>
        <v-card>

            <v-simple-table
               fixed-header
               v-if="obj"
           >
               <thead>
                   <tr>
                       <th
                           v-for="(key, index) in keys"
                           :key="index"
                           v-text="key.text"
                       >
                       </th>
                       <th>Action</th>
                   </tr>
               </thead>
               <tbody>
                   <tr class="filters my-5">
                       <td
                           v-for="(key, i) in keys"
                           :key="i"
                           v-if="key.filter"
                       >
                           <v-text-field
                               hide-details
                               width="50px"
                               solo
                               :placeholder="key.text"
                               autocomplete="nope"
                           >
                           </v-text-field>
                       </td>
                       <td v-else></td>
                       <td></td>
                   </tr>
                   <tr v-for="(d, i) in obj.data" :key="i">
                       <td v-for="(key, index) in keys" :key="index">
                           <div v-if="key.switch">
                               <v-switch
                                   v-model="d[index]"
                                   inset
                                   color="success"
                                   @change="changeSwitch(index, d[index], d['id'])"
                               ></v-switch>
                           </div>
                           <div v-else>
                               {{ d[index] }}
                           </div>
                       </td>
                       <td>
                           <v-menu
                               left
                               bottom
                           >
                               <template v-slot:activator="{ on }">
                               <v-btn icon v-on="on">
                                   <v-icon>mdi-dots-horizontal</v-icon>
                               </v-btn>
                               </template>
                               <v-list>
                                   <v-list-item :to="slug + '/' + d['id']">
                                       <v-list-item-title>
                                           <v-icon left>mdi-pencil-outline</v-icon>
                                           Edit
                                       </v-list-item-title>
                                   </v-list-item>
                                   <v-list-item @click="deleteData(d['id'])" color="error">
                                       <v-list-item-title>
                                           <v-icon left>mdi-delete-outline</v-icon>
                                           Delete
                                       </v-list-item-title>
                                   </v-list-item>
                               </v-list>
                           </v-menu>
                       </td>
                   </tr>
               </tbody>
           </v-simple-table>
        </v-card>
        <div class="flex space-between align-center" id="_metasBottom">
            <div>
                <Paginate
                    v-if="obj && obj.last_page && obj.last_page > 1"
                    :current_page="$route.query.page"
                    @paginate="triggerPaginate"
                    :totalPage="obj.last_page"
                ></Paginate>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        component: {
            default: null
        },
        slug: {
            default: null
        },
        endpoint: {
            default: null
        },
        heads: {
            default: null
        },
    },
    data () {
        return {
            obj: null,
            keys: null
        }
    },
    created () {

        if (!this.endpoint) {
            return;
        }

        var page = this.$route.query.page;

        if (!page) {
            var page = 1;
        }

        var url = this.endpoint + '?page=' + page;

        return this.$axiosx.get(url)
        .then((res) => {
            this.obj = res.data.obj;
            this.keys = res.data.keys;
        });

    },
    methods: {
        getList: function(page = 1) {

            if (!this.endpoint) {
                return;
            }

            var url = this.endpoint + '?page=' + page;

            this.$axiosx.get(url)
            .then((res) => {
                this.obj = res.data.obj;
                this.keys = res.data.keys;
            });

        },
        triggerPaginate (paginate) {

            this.$router.push({
                query: {
                    page: paginate
                }
            });

            this.getList(paginate);
        },
        deleteData (id) {
            var c = confirm('Do you want to delete this?');
            if (c) {
                var data = {
                    id : id,
                    component: this.component
                };

                var url = '/' + this.component + '/delete/' + id;
                var page = this.$route.query.page;
                if (!page) {
                    var page = 1;
                }

                this.$axiosx.post(url, data)
                .then((res) => {
                    this.$store.commit('snackbar', res.data);
                    this.getList(page);
                });
            }
        },
        changeSwitch (key, val, id) {

            if (!this.component) {
                return;
            }

            var data = {
                component: this.component,
                column: key,
                id: id,
                value: val
            }

            this.$axiosx.post('/change/status', data)
            .then((res) => {
                if (res.data.status == 'success') {
                    this.$store.commit('snackbar', res.data);
                }
            });
        }
    }
}
</script>
