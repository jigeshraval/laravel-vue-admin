<template>
    <div>
        <div id="_metas">
            <div class="_metas_other1 flex align-center">
                <div class="title">Trusted Customers</div>
                <div>
                    <span class="caption">(Showing 10)</span>
                </div>
            </div>
            <div id="_metas_other" class="flex align-center flex-end">
                <v-btn
                    to="/trusted/customers/add"
                    color="success"
                >
                    <v-icon>mdi-plus</v-icon>
                    Add New
                </v-btn>
            </div>
        </div>
        <v-card>
            <v-simple-table
                fixed-header
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Address</th>
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
                                placeholder="Email"
                            >
                            </v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                hide-details
                                solo
                                placeholder="Mobile"
                            >
                            </v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                hide-details
                                solo
                                placeholder="Address"
                            >
                            </v-text-field>
                        </td>
                    </tr>
                    <tr v-for="n in 10" :key="n">
                        <td v-text="n"></td>
                        <td>Jigesh Raval</td>
                        <td>jigesh@jigeshraval.com</td>
                        <td>7405282053</td>
                        <td>C - 101, Maruti Magnum, Randesan, Gandhinagar</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-card>
        <div class="flex justify-center align-center" id="_metasBottom">
            <div></div>
            <div>
                <v-pagination
                    :length="6"
                ></v-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>
