import { createRouter, createWebHistory } from 'vue-router';

import Donos from './components/Donos.vue'
import Pets from './components/Pets.vue'

const routes = [
    {
        path: '/donos',
        name: 'donos',
        component: Donos
    },
    {
        path: '/pets',
        name: 'pets',
        component: Pets
    },
];

const router = createRouter({history: createWebHistory(), routes})

export default router;