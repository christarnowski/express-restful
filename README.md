express-restful
===============

A framework for writing RESTful APIs with Express.

```js
var express = require('express'),
    restful = require('express-restful');


app.restful('/v1/posts', {
    'list': function(req, res) {
        //Same as app.get('/v1/posts', function(req, res) {})
    },
    'create': function(req, res) {
        //Same as app.post('/v1/posts', function(req, res) {})
    },
    'read': function(req, res) {
        //Same as app.get('/v1/posts/:id', function(req, res) {})
    },
    'update': function(req, res) {
        //Same as app.put('/v1/posts/:id', function(req, res) {})
    },
    'delete': function(req, res) {
        //Same as app.delete('/v1/posts/:id', function(req, res) {})
    },
});
```

Installation
------------

    $ npm install express-restful


Features
--------

* RESTful resource routing (CRUD + list)
* Express-compatible route definitions
* Resource association support
* Middleware support

Usage
-----

```js
app.restful(PATH, [MIDDLEWARE...], HANDLERS)
```

Where:

* `PATH`: Express resource path (e.g. `/v1/posts`)
* `MIDDLEWARE`: An array and/or a list of middleware functions
* `HANDLERS`: An object that defines one or more operations on a resource.


### Applying Middleware

All of the following are supported, including mixins:

```js
app.restful(PATH, middleware1, middleware2, middleware3, HANDLERS)

app.restful(PATH, [middleware1, middleware2, middleware3], HANDLERS)

app.restful(PATH, [middleware1, middleware2], middleware3, HANDLERS)

app.restful(PATH, {
    'list': [middleware6, middleware7, function(req, res) {}]
    '$': {
        'pre': [middleware4, middleware5]
    }
})
```

The order in which middleware is applied follows the numbering of `middleware` functions.

### Specifying resource ID parameter

You can override the default name of resource ID parameter by defining `id` property of settings object (`$`). For example:

```js
exports.posts = {
    'list': function(req, res) {},
    '$': {
        'id': NEW_PARAMETER_NAME
    }
}
```

Running Tests
-------------

TBA
