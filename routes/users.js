const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Responses = require('./responses');
const _ = require('lodash');

router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Already at /courses
router.route('/:uid')
    .get(function(req, res) {
        mongoose.model('User').find({username: req.params.username}, function(err, courses) {
            if (err) {
                Responses.standardError(res, err);
            } else {
                Responses.standardResponse(res, courses);
            }
        });
    })
    .put(function(req, res) {
        mongoose.model('User').findOne({_id: req.params.username}, (err, user) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                _.assign(user, req.body);
                user.save(function(err) {
                    if (err) {
                        Responses.standardError(res, err);
                    } else {
                        Responses.standardResponse(res, user);
                    }
                });
            }
        });
    })
    .post(function(req, res) {
        mongoose.model('User').create(req.body, (err, user) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                Responses.standardResponse(res, user);
            }
        });
    })
    .delete(function(req, res) {
        mongoose.model('User').findOne({_id: req.params.username}, (err, user) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                _.assign(user, req.body);
                user.remove(function(err) {
                    if (err) {
                        Responses.standardError(res, err);
                    } else {
                        Responses.standardResponse(res, user);
                    }
                });
            }
        });
    });

module.exports = router;
