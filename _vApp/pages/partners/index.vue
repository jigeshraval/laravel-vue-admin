<template>
    <div>
        <Header
          heading="Partners"
        >
            <v-btn
                to="/partners/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/partners"
            slug="/partners"
            component="partners"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/partners',
            totalPage: null
        }
    },
    beforeCreate () {

    },

}
</script>
