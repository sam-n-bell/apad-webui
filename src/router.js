import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store/store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/pages/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/userstest',
      name: 'userstest',
      component: () => import('./views/UsersTest.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('./views/pages/Events.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/venues',
      name: 'venues',
      component: () => import('./views/pages/Venues.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./views/pages/Users.vue'),
      meta: {
        requiresAuth: true,
        // permission: 'admin'
      }
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

router.beforeEach((to,from,next) => {
  if (to.meta.requiresAuth ){
    console.log("must be logged in")
    // if vuex logged_in is false but token is present
    // happens if a page is refreshed, causing vuex to wipe data
    if (!store.state.user.logged_in && localStorage.getItem('auth_token')) {
        try {
          //GET user data
          //COMMIT SET_CURRENT_USER & LOGGED_IN
          store.commit('user/SET_CURRENT_USER', {user_id: 1, name: 'Sam Bell', administrator: 1});
          store.commit('user/SET_LOGGED_IN', true)
          next();
        } catch (err) {
          next('/login')
        }
    } 

    // when navigating around using app urls
    if (!store.state.user.logged_in) next('/login');

    // accessing admin only page
    // if (to.meta.permission) {
    //   console.log('permission needed');
    //   if (to.meta.permission === 'admin') {
    //     if (store.state.user.use_details.administrator == 1) {
    //       console.log('you\'re an admin')
    //       next()
    //     } else {
    //       next('/events')
    //     }
    //   }
    // }

    next()
  } else {
    console.log('outer else')
    next();
  }
})

export default router;
