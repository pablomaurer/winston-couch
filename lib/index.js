/*
 * winston-couch.js: Winston Transport for CouchDB
 *
 * (C) 2016 Pablo Maurer
 * MIT License
 * todo if you need query and other stuff, send a pr if you like! For me the core-log functionality is enough. Thhanks
 */

var util    = require('util'),
    winston = require('winston'),
    PouchDB = require('pouchdb'),
    moment = require('moment');

/**
 * @constructs Couch
 * @param {object} Object containing all the options for transport.
 */

var Couch = exports.Couch = function (options) {
    options = options || {};

    if (!options.pouchOptions){
        throw new Error("winston-couch requires 'pouchOptions' property they will directly flow into the PouchDB constructor. More info of how this property needs to look: http://pouchdb.com/api.html#create_database");
    }

    this.pouchOptions = options.pouchOptions;

    this.level      = options.level                  || 'info';
    this.silent     = options.silent                 || false;
    this.handleExceptions = options.handleExceptions || false;

    this.db = new PouchDB(options.pouchOptions);
    this.counter = 0;
    this.moment = null;
};

util.inherits(Couch, winston.Transport);
winston.transports.Couch = Couch;

/**
 * Winston requires log function to be exposed on all
 * transports. This is the core logging functionality
 * for winston-couch transport.
 *
 * @function log
 * @param level {String} Level to log msg for.
 * @param msg {String} String message that will be logged.
 * @param meta {Object} Optional meta data
 * @param callback {function} Callback to winston.
 */
Couch.prototype.log = function (level, msg, meta, callback) {

    var self = this;
    if (this.silent) return callback(null, true);

    // if same moment add counter format: logs-moment-counter
    if (this.moment === moment().format('x')) {
        this.counter++;
        this.moment = this.moment + '-' + this.counter;
    } else {
        this.counter = 0;
        this.moment = moment().format('x');
    }

    this.db.put({
        _id: 'log-' + this.moment,
        msg: msg,
        meta: meta,
        level: level,
        type: 'log'
    }).then(function (response) {
        console.log(response);
        self.emit('logged');
        callback(null, true);
    }).catch(function (err) {
        console.log(err);
        self.emit('error', err);
        callback(null, true);
    });
};