# LOGIN/REGISTER Authentication

## GOAL

- **Register a user**
  - Information required :
    - _firstname_,
    - _lastname_,
    - _email_,
    - _password_
- **Login a user**
  - Information required :
    - _email_,
    - _password_
- **Allow him to dashboard, after succesful login.**

## Designing model for Database(i.e MVC, MVM)

### Model

> **User Information**

- _firstname_,
- _lastname_,
- _email_,
- _password_,
- _token_,

### Controller

> **/register**

1. _Collect all info from frontend - req.body,_

2. _Validate - if all data exists, if not, send note,_

3. _Check if user already exist,_

4. _Encrypt the password,_

5. _Save to Database and send a key(token)._

> **/login**

1. _Collect all info from frontend - req.body,_

2. _Validate - if all data exists, if not, send note,_

3. _Check if user exists in DB,_

4. _Match the password (password already encrpyted),_

5. _Create a key for user and send it._

> **/dashboard**

1. _Check if key exists -valid,_
2. _Allow him/her the access_.

### Config

> **Database Connection**
