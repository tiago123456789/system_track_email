import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/auth/Login.vue";
import ResetPassword from "./components/auth/ResetPassword";
import Dashboard from "./components/dashboard/Dashboard";
import NewUser from "./components/user/NewUser";
import ListUser from "./components/user/ListUser";
import ListPermission from "./components/permissions/ListPermission";
import ListEmail from "./components/email/ListEmail";
import NewEmail from "./components/email/NewEmail";
import EditUser from "./components/user/EditUser";
import ListActionTracked from "./components/email/ListActionTracked";

import NewPermission from "./components/permissions/NewPermission";
import ListNewsletter from "./components/newsletter/ListNewsletter"

import ROUTES from "./constants/Routes";

import AuthService from "./services/AuthService";

const authService = new AuthService();

Vue.use(VueRouter);

const routes = new VueRouter({
    routes: [
        { path: ROUTES.LOGIN, component: Login },
        { path: ROUTES.RESET, component: ResetPassword },
        { path: ROUTES.EMAILS, component: ListEmail },
        { path: ROUTES.NEW_EMAIL, component: NewEmail },
        { path: ROUTES.EMAIL_ACTIONS_TRACKED, component: ListActionTracked },
        { path: ROUTES.NEWSLETTER_PUBLISH, component: NewEmail },
        { path: ROUTES.NEWSLETTERS, component: ListNewsletter },
        { path: ROUTES.PERMISSIONS, component: ListPermission },
        { path: ROUTES.USERS, component: NewUser },
        { path: ROUTES.LIST_USER, component: ListUser },
        { path: ROUTES.NEW_PERMISSION, component: NewPermission },
        { path: ROUTES.DASHBOARD, component: Dashboard },
        { path: ROUTES.EDIT_USER, component: EditUser },
        { path: "*", component: Login },
    ]
});

routes.beforeEach((to, from, next) => {
    const isPublicRoute = ROUTES.PUBLIC_ROUTES.indexOf(to.path) >= 0;
    if (isPublicRoute) {
        next();
        return;
    }

    const permissions = ROUTES.ROUTE_PERMISSIONS[to.path] ? [ROUTES.ROUTE_PERMISSIONS[to.path]] : [];
    if (authService.isAuthenticated() && authService.hasPermissions(permissions)) {
        next();
        return;
    }

    next(ROUTES.LOGIN);
})

export default routes;