# Author: Emily Greason

## Setup

- .**env requirements**:

PORT=3001
DATABASE_URL=postgres://localhost:5432/postgres
SECRET=Ilovedoggos

- **Running the app**
  - npm start

- **tests**
  - auth test --> npm test auth.test.js
  - server test --> npm test server.test.js

![lab-08-uml-pt1](../auth-api/img/lab-08-uml-pt1.png)
![lab-08-uml-pt2](../auth-api/img/lab-08-uml-pt2.png)

## Game Plan

~~server.js~~
~~root index.js~~
~~.gitignore~~
~~index models~~
~~POST /signup to create a user.~~
~~POST /signin to login a user and receive a token.~~
~~GET /secret should require a valid bearer token.~~
~~GET /users should require a valid token and “delete” permissions.~~

