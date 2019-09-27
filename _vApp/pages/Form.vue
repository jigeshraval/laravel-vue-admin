<template>
    <div>
        <div id="_metas">
            <div class="_metas_other1 flex align-center">
                <div class="title">Users</div>
                <div>
                    <span class="caption">Add New</span>
                </div>    
            </div>
            <div id="_metas_other" class="flex align-center flex-end">
                <v-btn
                    to="/table"
                    color="success"
                >
                    <v-icon>mdi-plus</v-icon>
                    List
                </v-btn>
            </div>
        </div>
        <v-card>
            <v-card-text>
                <v-text-field
                    label="Full Name"
                >
                </v-text-field>
                <v-text-field
                    label="Email"
                    type="email"
                >
                </v-text-field>
                <v-text-field
                    label="Password"
                    type="password"
                >
                </v-text-field>
                <v-btn
                    large
                    color="success"
                >Save</v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    mounted () {
        // this.$router.push('/form?jigesh=test');
    }
}
</script>