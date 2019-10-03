<template>
    <div>
        <Header
          heading="Equipment"
        >
            <v-btn
                to="/equipment/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/equipment"
            slug="/equipment"
            component="equipment"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            totalPage: null
        }
    },
}
</script>
