
<template>
    <div>
        <Header
          heading="Admin Menu"
        >
            <v-btn
                to="/admin/menu/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/admin/menu"
            slug="/admin/menu"
            component="admin_menu"
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
    }
}
</script>
