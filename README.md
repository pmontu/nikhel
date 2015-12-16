# usser info curd api

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone https://github.com/pmontu/nikhel.git # or clone your own fork
$ cd nikhel
$ npm install
$ nodemon index.js
```

install and start the mongo service

## API

LIST
GET /users/
returns []

RETRIEVE
GET /users/:userid
returns user object at :userid

DELETE
DELETE /users/:userid
returns count documents affected

INSERT
POST /users/
returns object inserted

UPDATE
PATCH /users/:userid
returns count documents affected

DUMP
GET /insert/
returns obj_inserted with _id

CHECK
POST /check/
returns x-www-form-urlencoded data
