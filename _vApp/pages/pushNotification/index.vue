<template>
    <div>
        <Header
          heading="Push Notification"
        >
            <v-btn
                to="/push/notification/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/push/notification"
            slug="/push/notification"
            component="push_notification"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/push/notification',
            totalPage: null
        }
    }
}
</script>
