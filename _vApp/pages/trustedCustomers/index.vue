<template>
    <div>
        <Header
          heading="Trusted Customers"
        >
            <v-btn
                to="/trusted/customers/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/trusted/customers"
            slug="/trusted/customers"
            component="trusted_customers"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            totalPage: null
        }
    },
    beforeCreate () {

    },

}
</script>
