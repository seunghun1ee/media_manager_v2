import { createApp } from 'vue'
import App from './App.vue'
import routes from "@/routes";
import {createRouter, createWebHistory} from "vue-router";

const router = new createRouter({
    history: createWebHistory(),
    routes: routes
})

const app = createApp(App);
app.config.devtools = true;

app.use(router).mount('#app')

