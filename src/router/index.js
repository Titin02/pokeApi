import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import DetallePokemon from '../views/detallePokemon.vue'

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/detallePokemon/:id", name: "detalle-pokemon", component: DetallePokemon },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router