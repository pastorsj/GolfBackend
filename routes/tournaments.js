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
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Already at /courses
router.route('/')
    .get(function(req, res) {
        mongoose.model('Tournament').find({}, function(err, courses) {
            if (err) {
                Responses.standardError(res, err);
            } else {
                Responses.standardResponse(res, courses);
            }
        });
    });

router.route('/:tid')
    .get(function(req, res) {
        mongoose.model('Tournament').find({_id: req.params.tid}, function(err, courses) {
            if (err) {
                Responses.standardError(res, err);
            } else {
                Responses.standardResponse(res, courses);
            }
        });
    })
    .put(function(req, res) {
        mongoose.model('Tournament').findOne({_id: req.params.id}, (err, tournament) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                _.assign(tournament, req.body);
                tournament.save(function(err) {
                    if (err) {
                        Responses.standardError(res, err);
                    } else {
                        Responses.standardResponse(res, tournament);
                    }
                });
            }
        });
    })
    .post(function(req, res) {
        mongoose.model('Tournament').create(req.body, (err, tournament) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                Responses.standardResponse(res, tournament);
            }
        });
    })
    .delete(function(req, res) {
        mongoose.model('Tournament').findOne({_id: req.params.id}, (err, tournament) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                _.assign(tournament, req.body);
                tournament.remove(function(err) {
                    if (err) {
                        Responses.standardError(res, err);
                    } else {
                        Responses.standardResponse(res, tournament);
                    }
                });
            }
        });
    });

module.exports = router;
