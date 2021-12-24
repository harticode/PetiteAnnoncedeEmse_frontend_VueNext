import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import * as firebase from "firebase/app";
import VueAxios from "vue-axios";
import './assets/tailwind.css'
import axios from "axios";
import { VueCookieNext } from 'vue-cookie-next'

var firebaseConfig = {
    apiKey: "AIzaSyDRDij7y3OhbXNUJFpMfqm_sIEKhVmx3xI",
    authDomain: "petites-annonces-de-l-emse.firebaseapp.com",
    projectId: "petites-annonces-de-l-emse",
    storageBucket: "petites-annonces-de-l-emse.appspot.com",
    messagingSenderId: "991841670031",
    appId: "1:991841670031:web:ee053bc404f7776b09f1fa"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(VueCookieNext);
app.mount("#app");
