import ROUTES from "./Routes";

export default ({
    ITENS: [
        {
            name: "Dashboard",
            route: ROUTES.DASHBOARD,
            permission: "view_dashboard"
        },
        {
            name: "Users",
            route: ROUTES.USERS,
            permission: "view_user"
        },
        {
            name: "Permissions",
            route: ROUTES.PERMISSIONS,
            permission: "view_permission"
        },
        {
            name: "Emails",
            route: ROUTES.EMAILS,
            permission: "view_email"
        },
        {
            name: "Newsletters",
            route: ROUTES.NEWSLETTERS,
            permission: "view_newsletter"
        }
    ]
});