<template>
    <div>
        <Header
          heading="Equipment Type"
        >
            <v-btn
                to="/equipment/type/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/equipment/type"
            slug="/equipment/type"
            component="equipment_type"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/equipment/type',
            totalPage: null
        }
    }
}
</script>
