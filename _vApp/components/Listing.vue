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
                           v-for="(key, i) in filterKeys"
                           :key="i"
                           v-if="key.filter"
                       >
                           <v-text-field
                               hide-details
                               width="50px"
                               solo
                               v-model="key.search"
                               :placeholder="key.text"
                               autocomplete="nope"
                               @input="filter(i, key.search)"
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
                                   <v-list-item :to="slug + '/edit/' + d['id']">
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
import debounce from 'debounce'

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
            keys: null,
            filterKeys: null
        }
    },
    created () {

        if (!this.endpoint) {
            return;
        }

        var url = this.endpoint + this.queryString(this.$route.query);

        this.$axiosx.get(url)
        .then((res) => {
            this.keys = res.data.keys;
            this.obj = res.data.obj;
        });

    },
    methods: {
        assignFilters () {
            if (this.keys) {

                var keys = this.keys;
                for (var key in keys) {
                    if (this.$route.query[key]) {
                        keys[key]['search'] = this.$route.query[key];
                    }
                }

                this.filterKeys = keys;
            }
        },
        pushQuery (obj) {
            var queryString = this.queryString(obj);
            history.pushState({}, '', queryString);
        },
        queryString (obj) {
            var array = Object.keys(obj);

            var arrayString = array.map(function (key) {
                if (obj[key]) {
                    return key + '=' + obj[key];
                }
            });

            var finalString = arrayString.join('&');

            if (finalString) {
                return '?' + finalString;
            }

            return '?page=1';
        },
        filterColumns: debounce(
            async function (key, val) {
                var k = {};
                k[key] = val;

                var obj = await Object.assign(this.$route.query, k);
                this.pushQuery(obj);
                this.getList();

            }, 500
        ),
        getList: function(page = 1) {

            if (!this.endpoint) {
                return;
            }

            var url = this.endpoint + this.queryString(this.$route.query);

            this.$axiosx.get(url)
            .then((res) => {
                this.obj = res.data.obj;
                this.keys = res.data.keys;
            });

        },
        triggerPaginate (paginate) {

            var obj = Object.assign(this.$route.query, { page: paginate });

            this.pushQuery(obj);

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
        },
        filter (key, val) {
            this.filterColumns(key, val);
        },
    },
    watch: {
        keys (list) {
            this.assignFilters();
        }
    }
}
</script>
