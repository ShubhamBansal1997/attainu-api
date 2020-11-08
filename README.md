# AttainU assignment 

Backend project for the attainu

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.18.1

    $ npm --version
    6.14.5

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g
---

## Install

    $ git clone https://github.com/ShubhamBansal1997/attainu
    $ cd attainu
    $ npm install
    $ cp .env.sample .env

## Configure app

Open `.env` then edit it with your settings. You will need:

- Mongodb Connection String;
- JWT Secert Key;
- http port;

## Running the project

    $ npm start

# API endpoints

!!!info
    For API overview and usages.

## Create User

```
POST /users
```

__Parameters__

Name     | Description
---------|-------------------------------------
name     | name of the user.
address  | address of the user.
email    | email of the user. 
password | password of the user.

__Request__
```json
{
    "name": "Test User",
    "address": "Test Address",
    "email": "hello@example.com",
    "password": "VerySafePassword0909"
}
```

__Response__
```json

Status: 201 Created
{
    "user": {
        "_id": "5fa7ef03cda7735c6ea02d56",
        "name": "Test User",
        "address": "Test Address",
        "email": "hello@example.com",
        "password": "$2a$10$Lv9Vt9mKerZ1zulDUFdpuuwk.EeeAV1ia6YuqdV7a8pLASOStycL2",
        "tokens": [
            {
                "_id": "5fa7ef03cda7735c6ea02d57",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE3ZWYwM2NkYTc3MzVjNmVhMDJkNTYiLCJpYXQiOjE2MDQ4NDEyMTl9.BPem_07pRrYLj_PiHl554C0K8JGgVe1qipo-CrAJTIY"
            }
        ],
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE3ZWYwM2NkYTc3MzVjNmVhMDJkNTYiLCJpYXQiOjE2MDQ4NDEyMTl9.BPem_07pRrYLj_PiHl554C0K8JGgVe1qipo-CrAJTIY"
}
```


## Login

```
POST /users/login
```

__Parameters__

| Name       | Description                                                |
| ---------- | ---------------------------------------------------------- |
| email      | email of the user. Errors out if email already registered. |
| password   | password of the user.                                |

**Request**

```json
{
  "email": "hello@example.com",
  "password": "VerySafePassword0909"
}
```

__Response__

```json

Status: 200 Ok
{
    "user": {
        "_id": "5fa7ef03cda7735c6ea02d56",
        "name": "Test User",
        "address": "Test Address",
        "email": "hello@example.com",
        "password": "$2a$10$Lv9Vt9mKerZ1zulDUFdpuuwk.EeeAV1ia6YuqdV7a8pLASOStycL2",
        "tokens": [
            {
                "_id": "5fa7ef03cda7735c6ea02d57",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE3ZWYwM2NkYTc3MzVjNmVhMDJkNTYiLCJpYXQiOjE2MDQ4NDEyMTl9.BPem_07pRrYLj_PiHl554C0K8JGgVe1qipo-CrAJTIY"
            },
            {
                "_id": "5fa7ef6bcda7735c6ea02d58",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE3ZWYwM2NkYTc3MzVjNmVhMDJkNTYiLCJpYXQiOjE2MDQ4NDEzMjN9.qhlYwW7QNCEEiRaElDU5iswDomw3aQXccPuUJ69KdYA"
            }
        ],
        "__v": 2
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE3ZWYwM2NkYTc3MzVjNmVhMDJkNTYiLCJpYXQiOjE2MDQ4NDEzMjN9.qhlYwW7QNCEEiRaElDU5iswDomw3aQXccPuUJ69KdYA"
}
```

## Get profile

```
GET /users/me (requires authentication)
```

__Response__
```
Status: 200 Ok
{
    "_id": "5fa7ef03cda7735c6ea02d56",
    "name": "Test User",
    "address": "Test Address",
    "email": "hello@example.com",
    "password": "$2a$10$Lv9Vt9mKerZ1zulDUFdpuuwk.EeeAV1ia6YuqdV7a8pLASOStycL2",
    "tokens": [
        {
            "_id": "5fa7ef03cda7735c6ea02d57",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE3ZWYwM2NkYTc3MzVjNmVhMDJkNTYiLCJpYXQiOjE2MDQ4NDEyMTl9.BPem_07pRrYLj_PiHl554C0K8JGgVe1qipo-CrAJTIY"
        },
        {
            "_id": "5fa7ef6bcda7735c6ea02d58",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE3ZWYwM2NkYTc3MzVjNmVhMDJkNTYiLCJpYXQiOjE2MDQ4NDEzMjN9.qhlYwW7QNCEEiRaElDU5iswDomw3aQXccPuUJ69KdYA"
        }
    ],
    "__v": 2
}
```


## Logout User from a single device

```
GET /users/me/logout (requires authentication)
```

__Response__
```json
Status: 204 No-Content
```

## Logout User from all device(s)

```
GET /users/me/logoutall (requires authentication)
```

__Response__
```json
Status: 204 No-Content
```

## Update User details(name, email, address)

```
PATCH /users/{user_id} (requires authentication)
```

__Parameters__

Name     | Description
---------|-------------------------------------
name     | name of the user.
address  | address of the user.
email    | email of the user. 

__Request__
```json
{
    "name": "Test User",
    "address": "Test Address",
    "email": "hello@example.com"
}
```

__Response__
```
Status: 204 No-Content
```

## Resize the image to thumbnail (50 x 50)

```
POST /users/thumbnail (requires authentication)
```

__Parameters__

Name     | Description
---------|-------------------------------------
uri      | url of the image.

__Request__
```json
{
    "uri": "https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg"
}
```

__Response__
```
Status: 201 Created
{
    "output": "images/f9785bcf-3f3d-45d9-9291-81d8bcab7e60.png"
}
```



