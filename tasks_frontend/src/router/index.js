import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';


//const routes = [
//  {
//    path: '/',
//    name: 'home',
//    component: HomeView
//  },
//  {
//    path: '/about',
//    name: 'about',
//    // route level code-splitting
//    // this generates a separate chunk (about.[hash].js) for this route
//    // which is lazy-loaded when the route is visited.
//    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//  }
//]

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', redirect: '/login' },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
