var express = require('express');

var _flatten = function(array, flat) {
    var flat = flat || [];

    for (var i = 0, len = array.length; i < len; i++) {
        if (Array.isArray(array[i])) {
            _flatten(array[i], flat);
        } else {
            flat.push(array[i]);
        }
    }

    return flat;
};

express.application.restful = function(path) {
    var argc = arguments.length,
        middleware,
        handlers;

    if (argc < 2) {
        throw new Error("app.restful requires at least two arguments: path and handlers");
    } else if (argc == 2) {
        middleware = [];
        handlers = arguments[1];
    } else if (argc > 2) {
        middleware = _flatten(arguments.slice(1, argc - 1));
        handlers = arguments[argc - 1];
    }

    var id = 'id';

    if ('$' in handlers) {
        if ('id' in handlers.$) {
            id = handlers.$.id;
        }

        if ('pre' in handlers.$) {
            middleware = middleware.concat(handlers.$.pre);
        }
    }

    if ('list' in handlers) {
        this.get(path, middleware.concat(handlers.list));
    }

    if ('create' in handlers) {
        this.post(path, middleware.concat(handlers.create));
    }

    var objectPath = path + '/:' + id;

    if ('read' in handlers) {
        this.get(objectPath, middleware.concat(handlers.read));
    }

    if ('update' in handlers) {
        this.put(objectPath, middleware.concat(handlers.update));
    }

    if ('delete' in handlers) {
        this.delete(objectPath, middleware.concat(handlers.delete));
    }
};


exports.version = '1.0.0'
