<template>
    <v-navigation-drawer
      expand-on-hover
      height="auto"
      permanent
    >
      <template v-slot:prepend>
        <v-list class="py-0" id="_logo">

          <v-list-item
            link
            two-line
          >
            <v-list-item-content>
              <v-list-item-title class="title _900">AdLara</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
          <v-list-item-group color="primary" v-for="item in items" :key="item.id">
            <v-list-item link color="red" :to="item.link">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', link: '/dashboard' },
        { icon: 'mdi-table-large', text: 'Table', link: '/table' },
        { icon: 'mdi-star', text: 'Starred', link: '/form' },
        { icon: 'mdi-iframe-braces-outline', text: 'Component', link: '/component/list' },
        { icon: 'mdi-cogs', text: 'Manufacturers', link: '/manufacturers' },
        { icon: 'mdi-account-tie-outline', text: 'Customers', link: '/customers' },
        { icon: 'mdi-account-convert', text: 'Dealers', link: '/dealers' },
        { icon: 'mdi-account-supervisor-outline', text: 'Preferred Dealers', link: '/preferred/dealers' },
        { icon: 'mdi-auto-fix', text: 'Completed Projects', link: '/completed/projects' },
        { icon: 'mdi-face-agent', text: 'Trusted Customers', link: '/trusted/customers' },
        { icon: 'mdi-account-multiple-outline', text: 'Partners', link: '/partners' },
        { icon: 'mdi-post', text: 'Post Category', link: '/post/category' },
        { icon: 'mdi-blogger', text: 'Post', link: '/post' },
        { icon: 'mdi-book-open-page-variant', text: 'Page', link: '/pages' },
        { icon: 'mdi-currency-usd', text: 'Plans', link: '/plans' },
        { icon: 'mdi-camera-metering-spot', text: 'Block', link: '/block' },
        { icon: 'mdi-format-list-bulleted-type', text: 'Equipment Type', link: '/equipment/type' },
        { icon: 'mdi-shape-outline', text: 'Equipment Category', link: '/equipment/category' },
        { icon: 'mdi-settings-outline', text: 'Equipment Options', link: '/equipment/options' },
        { icon: 'mdi-television-classic', text: 'Advertisement', link: '/advertisement' },
        { icon: 'mdi-bell-ring', text: 'Push Notification', link: '/push/notification' },
        { icon: 'mdi-email-outline', text: 'Emails', link: '/emails' },
        { icon: 'mdi-account-circle-outline', text: 'Employee', link: '/employee' },
      ]
    }
  }
}
</script>
