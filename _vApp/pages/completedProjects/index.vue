<template>
    <div>
        <Header
          heading="Completed Projects"
        >
            <v-btn
                to="/completed/projects/add"
                color="info"
            >
                <v-icon left>mdi-view-list</v-icon>
                Add
            </v-btn>
        </Header>
        <Listing
            endpoint="/completed/project"
            slug="/completed/projects"
            component="completed_project"
        >
        </Listing>
    </div>
</template>

<script>
export default {
    data () {
        return {
            obj: [],
            slug: '/completed_project',
            totalPage: null
        }
    },
    beforeCreate () {

    },

}
</script>
