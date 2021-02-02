import { Express } from "express";
import handlerExceptionMiddleware from "../middlewares/HandlerExceptionMiddleware";
import UserEndpointFactory from "../factories/UserEndpointFactory";
import AuthEndpointFactory from "../factories/AuthEndpointFactory";
import EmailEndpointFactory from "../factories/EmailEndpointFactory";
import authorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import getUserAuthenticatedMiddleware from "../middlewares/GetUserAuthenticatedMiddleware";
import NewsletterEndpointFactory from "../factories/NewsletterEndpointFactory";
import ResetPasswordEndpointFactory from "../factories/ResetPasswordEndpointFactory"

const userEndpoint = new UserEndpointFactory().make({});
const authEndpoint = new AuthEndpointFactory().make({});
const emailEndpoint = new EmailEndpointFactory().make({});
const newsletterEndpoint = new NewsletterEndpointFactory().make({});
const resetPasswordEndpoint = new ResetPasswordEndpointFactory().make({});

export default (app: Express) => {
    /**
   * @swagger
   * definitions:
   *  ResetPasswordUpdate:
   *    properties:
   *        password: 
   *            type: string
   * 
   *  ResetPassword:
   *    properties:
   *        email:
   *            type: string       
   * 
   *  Authentication:
   *    properties:
   *      email: 
   *          type: string
   *      password:
   *          type: string
   * 
   *  Email:
   *    properties:
   *      subject: 
   *          type: string
   *      from:
   *          type: string
   *      to: 
   *          type: string
   *      body:
   *          type: string
   * 
   *  Newsletter:
   *      properties:
   *          name:
   *              type: string
   * 
   *  Subscribe:
   *      properties:
   *          name:
   *            type: string
   * 
   *  Permission:
   *      properties:
   *          name:
   *            type: string
   *  
   *  PublishNewsletter:
   *      properties:
   *           subject: 
   *              type: string
   *           from: 
   *              type: string
   *           body:
   *              type: string
   * 
   *  User:
   *     properties:
   *        username: 
   *            type: string
   *        email: 
   *            type: string
   *        password: 
   *            type: string
   * 
   *  AddPermissionUser:
   *      properties:
   *         permissions: 
   *             type: array
   *             items:
   *                type: integer
   *         
   */

    /**
    * @swagger
    * /users:
    *   post:
    *     tags:
    *       - User
    *     summary: Create new user
    *     parameters:
    *       - name: body
    *         required: true
    *         type: object
    *         schema: 
    *           $ref: "#/definitions/User"
    *         in: body
    *       - name: Authorization
    *         required: true
    *         type: string
    *         in: header
    *     produces:
    *       - application/json
    *     responses:
    *        200: 
    *          description: Operation executed success.
    *        400:
    *          description: Datas invalids.
    *        409:
    *          description: User's emails can't used.
    */
    app.post("/users",
        authorizationMiddleware.hasPermission(["create_user"]),
        getUserAuthenticatedMiddleware,
        userEndpoint.create
    );

    /**
  * @swagger
  * /users/permissions:
  *   get:
  *     tags:
  *       - User
  *     summary: Get permissions availibily
  *     parameters:
  *       - name: authorization
  *         required: true
  *         type: string
  *         in: header
  *     produces:
  *       - application/json
  *     responses:
  *        200: 
  *          description: Operation executed success.
  */
    app.get("/users/permissions",
        authorizationMiddleware.hasPermission(["list_permission"]),
        getUserAuthenticatedMiddleware,
        userEndpoint.getPermissions
    );

    /**
 * @swagger
 * /users/permissions:
 *   post:
 *     tags:
 *       - User
 *     summary: Create new permissions
 *     parameters:
 *       - name: body
 *         required: true
 *         type: object
 *         schema: 
 *           $ref: "#/definitions/Permission"
 *         in: body
 *       - name: authorization
 *         required: true
 *         type: string
 *         in: header
 *     produces:
 *       - application/json
 *     responses:
 *        200: 
 *          description: Operation executed success.
 *        400:
 *          description: Datas invalids.
 */
    app.post("/users/permissions",
        authorizationMiddleware.hasPermission(["create_permission"]),
        getUserAuthenticatedMiddleware,
        userEndpoint.createPermission
    );

    /**
* @swagger
* /users/{id}/permissions:
*   post:
*     tags:
*       - User
*     summary: Add permissions to user
*     parameters:
*       - name: id
*         required: true
*         type: string
*         in: path
*       - name: body
*         required: true
*         type: object
*         schema: 
*           $ref: "#/definitions/AddPermissionUser"
*         in: body
*       - name: authorization
*         required: true
*         type: string
*         in: header
*     produces:
*       - application/json
*     responses:
*        200: 
*          description: Operation executed success.
*        400:
*          description: Datas invalids.
*        404:
*          description: Not found users ou not found permission.
*/
    app.post("/users/:id/permissions",
        authorizationMiddleware.hasPermission(["add_permission_user"]),
        getUserAuthenticatedMiddleware,
        userEndpoint.addPermissionsForUser
    );


    /**
     * @swagger
     * /auth:
     *   post:
     *     tags:
     *       - Authentication
     *     summary: User authentication 
     *     parameters:
     *       - name: body
     *         required: true
     *         type: object
     *         schema: 
     *           $ref: "#/definitions/Authentication"
     *         in: body
     *     produces:
     *       - application/json
     *     responses:
     *        200: 
     *          description: Operation executed success.
     *        400:
     *          description: Datas invalids.
     *        401:
     *          description: Credentials mencinoated invalids.
     */
    app.post("/auth", authEndpoint.authenticate);

    app.get("/emails/tracking/open", emailEndpoint.trackOpen);
    app.get("/emails/tracking/click", emailEndpoint.trackClick);

    /**
   * @swagger
   * /emails/{id}/tracks:
   *   get:
   *     tags:
   *       - Email
   *     summary: Return actions tracked of email
   *     parameters:
   *       - name: id
   *         required: true
   *         type: string
   *         in: path
   *       - name: authorization
   *         required: true
   *         type: string
   *         in: header
   *     produces:
   *       - application/json
   *     responses:
   *        200: 
   *          description: Return email success.
   */
    app.get("/emails/:id/tracks",
        authorizationMiddleware.hasPermission(["view_email"]),
        getUserAuthenticatedMiddleware,
        emailEndpoint.getActionsTrackedByEmailId);

    /**
    * @swagger
    * /emails:
    *   post:
    *     tags:
    *       - Email
    *     summary: Create email and after send it.
    *     parameters:
    *       - name: body
    *         required: true
    *         type: object
    *         schema: 
    *           $ref: "#/definitions/Email"
    *         in: body
    *       - name: authorization
    *         required: true
    *         type: string
    *         in: header
    *     produces:
    *       - application/json
    *     responses:
    *        201: 
    *          description: Create email success.
    *        400:
    *          description: Datas invalids.
    */
    app.post("/emails",
        authorizationMiddleware.hasPermission(["create_email"]),
        getUserAuthenticatedMiddleware,
        emailEndpoint.create);

    /**
   * @swagger
   * /emails:
   *   get:
   *     tags:
   *       - Email
   *     summary: Get user's emails.
   *     parameters:
   *       - name: authorization
   *         required: true
   *         type: string
   *         in: header
   *     produces:
   *       - application/json
   *     responses:
   *        200: 
   *          description: Execute with success.
   */
    app.get("/emails",
        authorizationMiddleware.hasPermission(["view_email"]),
        getUserAuthenticatedMiddleware,
        emailEndpoint.getAllByUserId);

    /**
     * @swagger
     * /newsletters:
     *   post:
     *     tags:
     *       - Newsletters
     *     summary: Create newsletter.
     *     parameters:
     *       - name: body
     *         required: true
     *         type: object
     *         schema: 
     *           $ref: "#/definitions/Newsletter"
     *         in: body
     *       - name: authorization
     *         required: true
     *         type: string
     *         in: header
     *     produces:
     *       - application/json
     *     responses:
     *        201: 
     *          description: Create email success.
     *        400:
     *          description: Datas invalids.
     *        409:
     *          description: Newsletter already exist.
     */
    app.post("/newsletters",
        authorizationMiddleware.hasPermission(["create_newsletter"]),
        getUserAuthenticatedMiddleware,
        newsletterEndpoint.create);

    /**
     * @swagger
     * /newsletters/{id}/subscribers:
     *   post:
     *     tags:
     *       - Newsletters
     *     summary: Subscribe in one newsletter.
     *     parameters:
     *       - name: id
     *         required: true
     *         type: string
     *         in: path
     *       - name: body
     *         required: true
     *         type: object
     *         schema: 
     *           $ref: "#/definitions/Subscribe"
     *         in: body
     *       - name: authorization
     *         required: true
     *         type: string
     *         in: header
     *     produces:
     *       - application/json
     *     responses:
     *        201: 
     *          description: Create email success.
     *        400:
     *          description: Datas invalids.
     *        409:
     *          description: Newsletter already exist.
     */
    app.post("/newsletters/:id/subscribers",
        authorizationMiddleware.hasPermission(["create_newsletter"]),
        getUserAuthenticatedMiddleware,
        newsletterEndpoint.subscribe);

    app.get("/newsletters/:newsletterId/subscribers/:id",
        newsletterEndpoint.unsubscribe);

    /**
    * @swagger
    * /newsletters:
    *   get:
    *     tags:
    *       - Newsletters
    *     summary: Get user's newsletters
    *     parameters:
    *       - name: authorization
    *         required: true
    *         type: string
    *         in: header
    *     produces:
    *       - application/json
    *     responses:
    *        200: 
    *          description: Create email success.
    */
    app.get(
        "/newsletters",
        authorizationMiddleware.hasPermission(["create_newsletter"]),
        getUserAuthenticatedMiddleware,
        newsletterEndpoint.getAllByUserId
    );

    /**
    * @swagger
    * /publishtions/newsletters/{id} :
    *   post:
    *     tags:
    *       - Newsletters
    *     summary: Publish newsletter for subscribers.
    *     parameters:
    *       - name: id
    *         required: true
    *         type: string
    *         in: path
    *       - name: body
    *         required: true
    *         type: object
    *         schema: 
    *           $ref: "#/definitions/PublishNewsletter"
    *         in: body
    *       - name: authorization
    *         required: true
    *         type: string
    *         in: header
    *     produces:
    *       - application/json
    *     responses:
    *        201: 
    *          description: Create email success.
    *        400:
    *          description: Datas invalids.
    */
    app.post("/publishtions/newsletters/:id",
        authorizationMiddleware.hasPermission(["publish_newsletter"]),
        getUserAuthenticatedMiddleware,
        newsletterEndpoint.publish);

    /**
   * @swagger
   * /reset-passwords:
   *   post:
   *     tags:
   *       - Reset password
   *     summary: Create reset password link
   *     parameters:
   *       - name: body
   *         required: true
   *         type: object
   *         schema: 
   *           $ref: "#/definitions/ResetPassword"
   *         in: body
   *     produces:
   *       - application/json
   *     responses:
   *        201: 
   *          description: Create reset password link.
   *        400:
   *          description: Datas invalids.
   */
    app.post(
        "/reset-passwords",
        resetPasswordEndpoint.create
    );

    /**
   * @swagger
   * /reset-passwords/{token}:
   *   get:
   *     tags:
   *       - Reset password
   *     summary: Check reset password link is valid
   *     parameters:
   *       - name: token
   *         required: true
   *         type: string
   *         in: path
   *     produces:
   *       - application/json
   *     responses:
   *        200: 
   *          description: Create reset password link.
   *        409:
   *          description: Reset password link invalid.
   */
    app.get(
        "/reset-passwords/:token",
        resetPasswordEndpoint.isTokenNotExpired
    );

    /**
  * @swagger
  * /reset-passwords/{token}:
  *   put:
  *     tags:
  *       - Reset password
  *     summary:  Update password of user.
  *     parameters:
  *       - name: token
  *         required: true
  *         type: string
  *         in: path
  *       - name: body
  *         required: true
  *         type: object
  *         schema: 
  *           $ref: "#/definitions/ResetPasswordUpdate"
  *         in: body
  *     produces:
  *       - application/json
  *     responses:
  *        204: 
  *          description: Update password success.
  *        409:
  *          description: Reset password link invalid.
  */
    app.put(
        "/reset-passwords/:token",
        resetPasswordEndpoint.updatePasswordByToken
    );

    app.get("/users",
        authorizationMiddleware.hasPermission(["create_user"]),
        getUserAuthenticatedMiddleware,
        userEndpoint.findAll
    );

    app.get("/users/:id",
        authorizationMiddleware.hasPermission(["view_user"]),
        getUserAuthenticatedMiddleware,
        userEndpoint.findById
    );

    app.put("/users/:id",
        authorizationMiddleware.hasPermission(["create_user"]),
        getUserAuthenticatedMiddleware,
        userEndpoint.update
    );


    // Handler exceptions in application.
    app.use(handlerExceptionMiddleware);
}