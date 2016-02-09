winston-pouchdb
===============

A Minimal PouchDB transport for [winston](https://github.com/winstonjs/winston).

## Setup

```bash
npm install winston --save
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

## Example Log and How To get them
example log
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

1. before you can get them, setup pouchdb
```bash
npm install winston-couch --save
```

```js
var PouchDB = require('pouchdb');
var db = new PouchDB('http://localhost:5984/myLoggingDatabase');
```

2. get all logs [pouchdb-allDocs](http://pouchdb.com/api.html#batch_fetch)
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

3. get all logs in a time range [pouchdb-allDocs](http://pouchdb.com/api.html#batch_fetch)
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

## Other Stuff
There is also [winston-couchdb](https://github.com/winstonjs/winston-couchdb) but I prefer PouchDB instead of the [Cradle CouchDB Client](https://github.com/flatiron/cradle). 
Also I wanted to have a meaningful id so i don't have to use `views`, since i really hat em =) Even there is also [PouchDB-Find](https://github.com/nolanlawson/pouchdb-find).