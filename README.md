About project:
==============

The project I focus change my both define architecture and development this project. The project is app than allow send email and track open email and track link clicked in email. Another features are: 
 - scheduler send email
 - newsletter(Feature responsable send email to subscribers.)
 - Notify when email opened or click in link within email(Created google extension to notify people when browser opened.)

Technologies used:
===================

- Backend
    - Node.js
    - Typescript
    - Api restful
    - Jwt
    - ACL(When create user is defined list permissions for it. Used in authorization the application)
    - SQS(Stored message to consumer application consume and send email)
    - Pusher(Notify people email open and click in links)
    - Mysql
    - Sentry(Centralize logging application)
    - Swagger(For create documentation the api in part the newsletter used per client to publish newsletter).
- Frontend(Web)
    - Vue
    - Vue router
    - Bootstrap
    - ACL(Used in authorization the application. Too responsable hidden or show elements)

- Frontend(google extension) 
    - React
    - Bootstrap
    - Pusher(Listen to event triggered when open or click in links of email)

REQUIREMENTS:
==============

- Node.js
- Npm
- Docker
- Docker compose
- typescript installed globally

Diagrams the application architecture: 
 - Arquivos: **fluxo_funcionalidade_envio_email_agendado.png**, **fluxo_sistema_track_email.png**

Setting backend:
------------------

- Clone project
- Access directory *backend*
- Execute command: **npm install**
- Create file *.env* based in file *.env.example*
- Execute command: **docker-compose build**
- Execute command: **docker-compose up -d**

Settings web-frontend:
-----------------------

- Clone project
- Access directory *web-frontend*
- Execute command: **npm install**
- Create file *.env* based in file *.env.example*
- Execute command: **npm run serve**


Settings extension-frontend:
-----------------------

- Clone project
- Access directory *extension-frontend*
- Execute command: **npm install**
- Create file *.env* based in file *.env.example*
- Execute command: **npm run build**
- Access page management extension and click in button with text "load without compact"

