import Vue from 'vue'
import vuetify from './plugins/Vuetify.js'
import axios from './plugins/Axios.js'
import Index from './pages/Index'
import Routes from './routes.js'
import vuex from './store/index.js'

const vApp = new Vue({
    vuex,
    axios,
    vuetify,
    router: Routes,
    el: '#dApp',
    render: h => h(Index)
});
