# recliner

> Authentication middleware for CouchDB

Sits in between a client and CouchDB to manage (regular) user account creation.
Allows you to keep your CouchDB admin account credentials out of your client
code, whilst making use of Couch's user account functionality. Works best with
sign up forms.

## Usage

Server:

```shell
DB_URL=https://my.couchdb.example.com \
DB_USERNAME=user \
DB_PASSWORD=pass \
USER_ROLES=posts,comments \
USER_GROUP=group \
npm start
```

Client:

```shell
curl -X PUT localhost:3000/users/alice \
  -H "Content-Type application/json" \
  -d '{"username": "alice", "password": "alice", "group": "author"}'
```

CouchDB:

```shell
curl localhost:5984/_users/org.couchdb.user%3Aa
```

```json
{
  "_id": "org.couchdb.user:alice",
  "_rev": "1-68ab0a84d7f8ef771a0e1d4ee49e8f05",
  "password_scheme": "pbkdf2",
  "iterations": 10,
  "name": "alice",
  "roles": [
    "posts",
    "comments",
    "group/author"
  ],
  "type": "user",
  "derived_key": "10f4676307c8c1777ebdaedcc0797eae8ba7a464",
  "salt": "99c4d3304c500c73378c56dca94d605c"
}
```

## Environment

`recliner` respects the following environment variables:

Variable      | Use
--------      | ---
`DB_URL`      | CouchDB URL (required)
`DB_USERNAME` | CouchDB HTTP basic auth username
`DB_PASSWORD` | CouchDB HTTP basic auth password
`USER_ROLES`  | Comma separated list of user roles
`USER_GROUP`  | Property name of the user's group, formatted as a role

## Author

© 2014 Tom Vincent <http://tlvince.com>

## License

Released under the [MIT license](http://tlvince.mit-license.org).
