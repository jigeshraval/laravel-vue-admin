<template>
    <div class="flex">
        <v-card
            class="ma-5"
            max-width="100%"
            width="100%"
            outlined
            v-for="n in 3"
            :key="n"
        >
            <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">Blog</div>
                <v-list-item-title class="headline mb-1">Posts</v-list-item-title>
                <!-- <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle> -->
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
            >
                <v-icon size="90">mdi-post-outline</v-icon>
            </v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
            <v-btn text>
                <v-icon left>mdi mdi-plus</v-icon>
                Add New
            </v-btn>
            <v-btn text>
                <v-icon left>mdi-view-list</v-icon>
                List
            </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    
}
</script>