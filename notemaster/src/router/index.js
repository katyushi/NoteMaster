import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/notes',
    name: 'listing',
    component: () => import(/* webpackChunkName: "viewNotes" */ '../views/ListAllNotesView.vue'),
  },
  {
    path: '/notes/new',
    name: 'create',
    component: () => import(/* webpackChunkName: "newNotes" */ '../views/CreateNotesView.vue'),
  },
  {
    path: '/notes/edit/:id',
    name: 'edit',
    component: () => import(/* webpackChunkName: "note" */ '../views/IndividualNoteView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
