<template>
    <div>
        <Header
          heading="Employee"
        >
            <v-btn
                to="/employee/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/employee"
            slug="/employee"
            component="employee"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/employee',
            totalPage: null
        }
    }
}
</script>
