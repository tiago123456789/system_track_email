import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/auth/Login.vue";
import Dashboard from "./components/dashboard/Dashboard";
import ListUser from "./components/user/ListUser";
import ListPermission from "./components/permissions/ListPermission";
import ListEmail from "./components/email/ListEmail";
import NewEmail from "./components/email/NewEmail";
import NewPermission from "./components/permissions/NewPermission";
import ListNewsletter from "./components/newsletter/ListNewsletter"

import ROUTES from "./constants/Routes";

import AuthService from "./services/AuthService";

const authService = new AuthService();

Vue.use(VueRouter);

const routes = new VueRouter({
    routes: [
        { path: ROUTES.LOGIN, component: Login },
        { path: ROUTES.EMAILS, component: ListEmail },
        { path: ROUTES.NEW_EMAIL, component: NewEmail },
        { path: ROUTES.NEWSLETTER_PUBLISH, component: NewEmail },
        { path: ROUTES.NEWSLETTERS, component: ListNewsletter },
        { path: ROUTES.PERMISSIONS, component: ListPermission },
        { path: ROUTES.USERS, component: ListUser },
        { path: ROUTES.NEW_PERMISSION, component: NewPermission },
        { path: ROUTES.DASHBOARD, component: Dashboard },
        { path: "*", component: Login },
    ]
});

routes.beforeEach((to, from, next) => {
    const isPublicRoute = ROUTES.PUBLIC_ROUTES.indexOf(to.path) >= 0;
    if (isPublicRoute) {
        next();
        return;
    }

    const isAccessUsingLinkAccess = /\/dashboard\/todos\/([a-zA-z-09-]){1,}/.test(to.path);
    if (isAccessUsingLinkAccess) {
        next();
        return;
    }

    if (authService.isAuthenticated()) {
        next();
        return;
    }

    next(ROUTES.LOGIN);
})

export default routes;