import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ListView from '@/views/ListView.vue';
import MovieView from '@/views/MovieView.vue';
import PersonView from '@/views/PersonView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import PersonalList from '@/views/PersonalList.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        redirect: '/list'
      },
      {
        path: '/list',
        name: 'list',
        component: ListView,
      },
      {
        path: '/movie',
        name: 'movie',
        component: MovieView,
      },
      {
        path: '/person',
        name: 'person',
        component: PersonView,
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView,
      },
      {
        path: '/register',
        name: 'register',
        component: RegisterView,
      },
      {
        path: '/mylist',
        name: 'mylist',
        component: PersonalList,
      }
    ],
    scrollBehavior(to, from, savedPosition) {
      return {top: 0, left: 0}
    },
    }, 
  );

export default router;