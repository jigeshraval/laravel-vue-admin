<template>
    <div>
        <Header
          heading="Preferred Dealer"
        >
            <v-btn
                to="/preferred/dealer/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/preferred/dealer"
            slug="/preferred/dealer"
            component="preferred_dealer"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/preferred/dealer',
            totalPage: null
        }
    },
}
</script>
