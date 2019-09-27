<template>
    <div>
        <Header
          heading="Manufacturers"
          :caption="manufacturers.length"
        >
            <v-btn
                to="/manufacturer/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <v-card>
            <v-simple-table
                fixed-header
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Preferred</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="filters my-5">
                        <td id="_tdID">
                            <v-text-field
                                hide-details
                                width="50px"
                                solo
                                autocomplete="nope"
                                placeholder="ID"
                            >
                            </v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                hide-details
                                class="_filter"
                                solo
                                autocomplete="nope"
                                placeholder="Full Name"
                            >
                            </v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                hide-details
                                solo
                                class="_filter"
                                placeholder="Email"
                            >
                            </v-text-field>
                        </td>
                        <td>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr v-for="manufacturer in manufacturers" :key="manufacturer.id">
                        <td>{{ manufacturer.id }}</td>
                        <td>{{ manufacturer.name }}</td>
                        <td>
                            <a :href="'mailto:' + manufacturer.email">{{ manufacturer.email }}</a>
                        </td>
                        <td>
                            <v-switch
                                v-model="manufacturer.status"
                                inset
                                color="success"
                                @change="changeSwitch('status', manufacturer.id, manufacturer.status)"
                            ></v-switch>
                        </td>
                        <td>
                            <v-switch
                                v-model="manufacturer.preferred"
                                inset
                                color="success"
                                @change="changeSwitch('preferred', manufacturer.id, manufacturer.preferred)"
                            ></v-switch>
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
                                       <v-list-item :to="slug + '/edit/' + manufacturer.id">
                                           <v-list-item-title>
                                               <v-icon left>mdi-pencil-outline</v-icon>
                                               Edit
                                           </v-list-item-title>
                                       </v-list-item>
                                       <v-list-item @click="deleteData(manufacturer.id)" color="error">
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
                    @paginate="triggerPaginate"
                    :totalPage="totalPage"
                ></Paginate>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            manufacturers: [],
            slug: '/manufacturer',
            totalPage: null
        }
    },
    beforeCreate () {
        return this.$axiosx.get('/manufacturer/list')
        .then((res) => {
            this.manufacturers = res.data.manufacturers.data;
            this.totalPage = res.data.manufacturers.last_page;
        });
    },
    methods: {
        getList: function(page = 1) {
            this.$axiosx.get('/manufacturer/list?page=' + page)
            .then((res) => {
                this.manufacturers = res.data.manufacturers.data;
                this.totalPage = res.data.manufacturers.last_page;
            });
        },
        triggerPaginate (paginate) {
            this.getList(paginate);
        },
        deleteData (id) {
            var c = confirm('Do you want to delete this?');
            if (c) {
                var data = {
                    id : id,
                    component: 'manufacturers'
                };

                this.$axiosx.post('/manufacturer/delete/' + id, data)
                .then((res) => {
                    this.$store.commit('snackbar', res.data);
                    this.getList();
                });
            }
        },
        changeSwitch (type, id, value) {
            var val = 0;
            if (value == false) {
                val = 1;
            }

            var data = {
                component: 'manufacturers',
                column: type,
                id: id,
                value: val

            };

            this.$axiosx.post('/change/status', data)
            .then((res) => {
                if (res.data.status == 'success') {
                    this.$store.commit('snackbar', res.data);
                    this.getList();
                }
            });
        }
    }
}
</script>
