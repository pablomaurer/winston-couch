winston-pouchdb
===============

A Minimal PouchDB transport for winston.

## Setup

```bash
npm install winston-couch --save
```

```js
var winston = require('winston');
var winstonCouch = require('winston-couchdb').Couch

var logger = new winston.Logger();
logger.add(winston.transports.Couch, {
    pouchOptions: 'http://localhost:5984/myLoggingDatabase',
});
```

The pouchOptions will directly be passed to the PouchDB Constructor, so look on [pouchdb.com](http://pouchdb.com/api.html#create_database) for further information.
I only implemented the log function, cause at the moment I don't need more. Feel free to implement missing stuff and send a pr. Would make the whole world a bit better. =)

## Examples
```js
{
  "_id": "log-1455018843770",
  "_rev": "1-883d63afef47907472826c3af238c015",
  "msg": "logging message stuff hello world",
  "meta": {},
  "level": "info",
  "type": "log"
}
```

### how to get all logs [pouchdb.com allDocs](http://pouchdb.com/api.html#batch_fetch)
```js
db.allDocs({
  include_docs: true,
  attachments: true,
}).then(function (result) {
  // handle result
}).catch(function (err) {
  console.log(err);
});
```

### how to get all logs in a time range [pouchdb.com allDocs](http://pouchdb.com/api.html#batch_fetch)
just add `startkey` and `endkey` as properties in format <log>-<timestampInMilliseconds>-\uffff
```js
db.allDocs({
  include_docs: true,
  attachments: true,
  startkey: 'log-1455018843770\uffff',
  endkey: 'log-1456000000000\uffff'
}).then(function (result) {
  // handle result
}).catch(function (err) {
  console.log(err);
});
```