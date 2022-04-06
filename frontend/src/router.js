import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
    },
    {
        path: '/browse',
        name: 'browse',
        component: () => import('./pages/Browse.vue')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('./pages/Browse.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
