<template>
    <div>
        <Header
          heading="Block"
        >
            <v-btn
                to="/block/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/block"
            slug="/block"
            component="block"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/block',
            totalPage: null
        }
    }
}
</script>
