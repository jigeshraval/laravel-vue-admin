<template>
    <div>
        <Header
          heading="Admin Menu Headings"
        >
            <v-btn
                to="/admin/menu/headings/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/admin/menu/headings"
            slug="/admin/menu/headings"
            component="menu_heading"
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
