<template>
    <div>
        <Header
          heading="Equipment Category"
        >
            <v-btn
                to="/equipment/category/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/equipment/category"
            slug="/equipment/category"
            component="equipment_category"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/equipment/category',
            totalPage: null
        }
    }
}
</script>
