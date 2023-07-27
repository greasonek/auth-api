# Class 08 Notes

## RBAC -->

- user signs up through /signup and sends a username/password in through the req.body
- we get the request
- we create a new user record - attach a token
- user signs in /signin route and they send on the header:
  - authorization: Basic aslfkls.fahsoghuo (encoded username:password)
  - we check and make sure that there is a user by that name AND the user by that name has a matching password using a library called bcrypt (bcrypt.compare)
  - if that checks out we send them back a token

  **BEARER MIDDLEWARE CHECKS IF THEIR TOKEN IS VALID!!**
  - VALID IF:
    - if the name matches a name in the db
    - if security measures are good
  - if make it past Bearer middleware then move to ACL middleware

## ACCESS CONTROL LIST

- **middleware!**
- checks:
  - does the user who made the request have permission to go to the route?

- if make it past ACL middleware then go to the handler

## Router Handler MW

- sends res.status(200).send('you made it')
- sends something back to the user

// add role to the user model as well as capabilities (permissions)
// add tests for these additions to user model
// add routes to server that will be permission based off roles
// change database to lab8
// since it does not exist do psql in the terminal then \l to see a list of available databases
// to create a database do CREATE DATABASE lab8; (or whatever name of your db will be) in terminal
// to switch to that database do \c lab8 (or whatever name your terminal is) in terminal to connect to that db
// need to update the db - psql in terminal
// \c lab8
// \dt (lets us look at our table of db)
// SELECT * FROM "Users";
// DROP TABLE "Users";
// hit Enter
// \q
// npm start
// now should be able to create a new user in the POST /signup route with a username/password and a role and the terminal
// will return the users capabilities and the token

**POST /signup** = POST -> body -> username & password -> send
**POST /signin** = POST -> Auth -> Basic -> username & password (it will give you a token)
**GET /secret** = GET -> Auth -> Bearer -> paste in the token
**GET /users** = GET -> Auth -> Bearer -> paste in the token (must do this with a user that has admin capabilities so if need to make a new user then need to start back at the signup route and then do get users)
