<template>
    <div>
        <Header
          heading="Emails"
        >
            <v-btn
                to="/email/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/email"
            slug="/email"
            component="email"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/email',
            totalPage: null
        }
    }
}
</script>
