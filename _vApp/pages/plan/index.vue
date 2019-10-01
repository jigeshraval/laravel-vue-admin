<template>
    <div>
        <Header
          heading="Plans"
        >
            <v-btn
                to="/plans/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/plans"
            slug="/plans"
            component="plans"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/plans',
            totalPage: null
        }
    }
}
</script>
