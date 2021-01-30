import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/auth/Login.vue";
// import ResetPassword from "./components/auth/ResetPassword.vue";
// import Dashboard from "./components/dashboard/Dashboard.vue";
// import TodoList from "./components/todo/TodoList.vue";
import ROUTES from "./constants/Routes";
// import authService from "./services/AuthService";

Vue.use(VueRouter);

const routes = new VueRouter({
    routes: [
        { path: ROUTES.LOGIN, component: Login },
        // { path: ROUTES.RESET_PASSWORD, component: ResetPassword },
        // { path: ROUTES.DASHBOARD, component: Dashboard },
        // { path: ROUTES.TODOS, component: TodoList },
        // { path: ROUTES.ACCESS_LINK_TODOS, component: TodoList },
        // { path: "*", component: Login },
    ]
});

// routes.beforeEach((to, from, next) => {
//     const isPublicRoute = ROUTES.PUBLIC_ROUTES.indexOf(to.path) >= 0;
//     if (isPublicRoute) {
//         next();
//         return;
//     }

//     const isAccessUsingLinkAccess = /\/dashboard\/todos\/([a-zA-z-09-]){1,}/.test(to.path);
//     if (isAccessUsingLinkAccess) {
//         next();
//         return;
//     }

//     if (authService.isAuthenticated()) {
//         next();
//         return;
//     }

//     next(ROUTES.LOGIN);
// })

export default routes;