import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import welcome from '../components/welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
}, {
    path: '/login',
    component: Login
}, {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: welcome
    }, {
        path: '/users',
        component: Users
    }]
}]

const router = new VueRouter({
    routes
})

// 
router.beforeEach((to, from, next) => {
    // jiang
    if (to.path === '/login') {
        return next()
    } else {
        const tokenstr = window.sessionStorage.getItem('token')
        if (!tokenstr) {
            return next('/login')
        } else {
            next()
        }
    }
})

export default router