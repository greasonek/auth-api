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
