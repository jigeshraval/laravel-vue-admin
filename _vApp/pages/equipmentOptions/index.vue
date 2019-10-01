<template>
    <div>
        <Header
          heading="Equipment Options"
        >
            <v-btn
                to="/equipment/options/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/equipment/options"
            slug="/equipment/options"
            component="equipment_options"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/equipment/options',
            totalPage: null
        }
    }
}
</script>
