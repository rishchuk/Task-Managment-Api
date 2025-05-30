import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import TaskList from '../components/TaskList.vue'
import About from '../views/AboutView.vue'

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
  { path: '/tasks', component: TaskList, meta: { requiresAuth: true } },
  { path: '/about', name: 'about', component: About },
  { path: '/', redirect: '/login' },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
