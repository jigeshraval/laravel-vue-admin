<template>
    <div>
        <Header
          heading="Manufacturers"
        >
            <v-btn
                to="/manufacturer/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/manufacturers"
            :slug="slug"
            component="manufacturers"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/manufacturer',
            totalPage: null
        }
    },
    beforeCreate () {

    },

}
</script>
