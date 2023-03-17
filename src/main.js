import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'
import Loader from '@/components/app/Loader.vue'
import Paginate from "vuejs-paginate-next"
import tooltipDirective from './directives/tooltip.directive'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import 'firebase/database'


initializeApp({
    apiKey: "AIzaSyC815l283TU7-dQB0Av8zFZ-Tzzna7YY64",
    authDomain: "vue-crm-6f212.firebaseapp.com",
    projectId: "vue-crm-6f212",
    storageBucket: "vue-crm-6f212.appspot.com",
    messagingSenderId: "891210170653",
    appId: "1:891210170653:web:7d729ed5c7b5aca1f561f4",
    measurementId: "G-18XVBV2E8M",
    databaseURL: 'https://vue-crm-6f212-default-rtdb.europe-west1.firebasedatabase.app/'
})

let app

getAuth().onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .directive('tooltip', tooltipDirective)
            .use(messagePlugin)
            .component('Loader', Loader)
            .component('Paginate', Paginate)
            .use(store)
            .use(router)
            .mount('#app')
    }

})



