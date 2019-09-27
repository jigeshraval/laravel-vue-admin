import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loading: false,
        test: 'jigesh',
        snackbar: {
            status: false,
            text: ''
        },
        api: 'http://127.0.0.1:8000/console/api',
        media_dialog: false,
        selectedMedia: [],
        selectedMediaIds: [],
        selectMultipleMedia: true,
        mediaSelectionFinished: false,
        mediaType: 'Image'
    },
    mutations: {
        setMediaType (state, type) {
            state.mediaType = type;
        },
        snackbar (state, data) {
            state.snackbar.status = data.status;

            if (!data.text) {
                data.text = '';
            }

            state.snackbar.text = data.text;
        },
        loading (state, status) {
            state.loading = status;
        },
        setSelectMultipleMedia (state, data) {
           state.selectMultipleMedia = data;
        },
        mediaSelectionFinished (state, data) {
           state.mediaSelectionFinished = data;
        },
        setSelectedMedia (state, array) {
           state.selectedMedia = array;
        },
        setSelectedMediaIds (state, array) {
           state.selectedMediaIds = array;
        },
        media_dialog (state, status) {
           state.media_dialog = status;
        },
    }
});

Vue.prototype.$store = store;

export default store;
