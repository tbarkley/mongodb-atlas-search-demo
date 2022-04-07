import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'default',
        component: () => import('./pages/Browse.vue')
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
