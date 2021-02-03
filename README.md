About project:
==============

The project I focus change my both define architecture and development this project. The project is app than allow send email and track open email and track link clicked in email. Another features are: 
 - scheduler send email
 - newsletter(Feature responsable send email to subscribers.)
 - Notify when email opened or click in link within email(Created google extension to notify people when browser opened.)

REQUIREMENTS:
==============

- Node.js
- Npm
- Docker
- Docker compose
- typescript installed globally

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

