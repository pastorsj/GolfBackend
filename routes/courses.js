'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Responses = require('./responses');
const _ = require('lodash');

router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Already at /courses
router.route('/')
    .get(function(req, res) {
        mongoose.model('Course').find({}, function(err, courses) {
            if (err) {
                Responses.standardError(res, err);
            } else {
                Responses.standardResponse(res, courses);
            }
        });
    })
    .post(function(req, res) {
        mongoose.model('Course').create(req.body, (err, course) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                Responses.standardResponse(res, course);
            }
        });
    });

router.route('/:cid')
    .get(function(req, res) {
        mongoose.model('Course').find({_id: req.params.cid}, function(err, courses) {
            if (err) {
                Responses.standardError(res, err);
            } else {
                Responses.standardResponse(res, courses);
            }
        });
    })
    .put(function(req, res) {
        mongoose.model('Course').findOne({
            _id: req.params.cid
        }, (err, course) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                _.assign(course, req.body);
                course.save(function(err) {
                    if (err) {
                        Responses.standardError(res, err);
                    } else {
                        Responses.standardResponse(res, course);
                    }
                });
            }
        });
    })
    .delete(function(req, res) {
        mongoose.model('Course').findOne({
            _id: req.params.cid
        }, (err, course) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                _.assign(course, req.body);
                course.remove(function(err) {
                    if (err) {
                        Responses.standardError(res, err);
                    } else {
                        Responses.standardResponse(res, course);
                    }
                });
            }
        });
    });

module.exports = router;
