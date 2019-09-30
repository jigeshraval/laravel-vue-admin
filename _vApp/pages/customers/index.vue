<template>
    <div>
        <Header
          heading="Customers"
        >
            <v-btn
                to="/customer/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/customer/list"
            slug="/customer"
            component="customers"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/dealers',
            totalPage: null
        }
    },
}
</script>
