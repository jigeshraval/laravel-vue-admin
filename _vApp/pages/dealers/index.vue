<template>
    <div>
        <Header
          heading="Dealers"
        >
            <v-btn
                to="/dealer/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/dealer/list"
            slug="/dealer"
            component="dealers"
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
    beforeCreate () {

    },

}
</script>
