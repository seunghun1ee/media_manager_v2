import { createApp } from 'vue'
import App from './App.vue'
import routes from "@/routes";
import {createRouter, createWebHistory} from "vue-router";

const router = new createRouter({
    history: createWebHistory(),
    routes: routes
})



createApp(App).use(router).mount('#app')

