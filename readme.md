# hassock

> Authentication proxy for CouchDB

Passes through any requests as-is to CouchDB, optionally setting an HTTP auth
header if `DB_USERNAME` and `DB_PASSWORD` are set.

Intended to be used to manage (regular) CouchDB user accounts. Allows you to
keep your CouchDB admin account credentials out of your client code, whilst
making use of CouchDB's user account functionality.

## Usage

Server:

```shell
DB_URL=https://my.couchdb.example.com \
DB_USERNAME=user \
DB_PASSWORD=pass \
npm start
```

Request:

```shell
curl -X PUT localhost:3000/_users/org.couchdb.user:alice \
  -H "Content-Type application/json" \
  -d '{"_id": "org.couchdb.user:alice", "name": "alice", "password": "alice", "roles": [], "type": "user"}'
```

Response:

```json
{"ok":true,"id":"org.couchdb.user:alice","rev":"1-39fb61aabac5418950ce6c0b3bbc5c63"}
```

Note, no authentication was set by the client.

## Environment

`hassock` respects the following environment variables:

Variable      | Use
--------      | ---
`DB_URL`      | CouchDB URL (required)
`DB_USERNAME` | CouchDB HTTP basic auth username
`DB_PASSWORD` | CouchDB HTTP basic auth password

## Author

© 2015 Tom Vincent <http://tlvince.com>

## License

Released under the [MIT license](http://tlvince.mit-license.org).
