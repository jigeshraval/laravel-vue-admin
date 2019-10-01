<template>
    <div>
        <Header
          heading="Advertisements"
        >
            <v-btn
                to="/advertisement/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/advertisement"
            slug="/advertisement"
            component="advertisement"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/advertisement',
            totalPage: null
        }
    }
}
</script>
