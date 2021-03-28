import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loader from './components/Loader'
import vueHeadful from 'vue-headful';
import messagePlugin from './utils/messagePlugin'
import date from './utils/datePlugin'
import 'materialize-css/dist/js/materialize.min.js'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
    apiKey: "AIzaSyA6xeUyvfo99Q2OPthq4yBkNSRpOBYXovA",
    authDomain: "vue-planning.firebaseapp.com",
    projectId: "vue-planning",
    storageBucket: "vue-planning.appspot.com",
    messagingSenderId: "648711207670",
    appId: "1:648711207670:web:e39cbad0e79de21bafcad7",
    measurementId: "G-T2PPQYPV97"
});

let app


firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .use(store)
            .use(router)
            .use(messagePlugin)
            .use(date)
        app.component('Loader', Loader)
        app.component('vue-headful', vueHeadful)
            .mount('#app')
    }
})