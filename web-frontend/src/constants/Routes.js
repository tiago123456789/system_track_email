export default ({
    LOGIN: "/login",
    USERS: "/dashboard/users",
    EMAILS: "/dashboard/emails",
    NEW_EMAIL: "/dashboard/emails/new",
    NEWSLETTERS: "/dashboard/newsletter",
    NEWSLETTER_PUBLISH: "/dashboard/newsletter/:id/publish",
    PERMISSIONS: "/dashboard/permissions",
    NEW_PERMISSION: "/dashboard/permissions/new",
    DASHBOARD: "/dashboard",
    PUBLIC_ROUTES: ["/login", "/reset-password"],
    ROUTE_PERMISSIONS: {
        "/dashboard/users": "view_user",
        "/dashboard/emails": "view_email",
        "/dashboard/emails/new": "view_email_new",
        "/dashboard/newsletter": "view_newsletter",
        "/dashboard/permissions": "view_permission",
        "/dashboard/permissions/new": "view_permission",
        "/dashboard": "view_dashboard",
    }
})