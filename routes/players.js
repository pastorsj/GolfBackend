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

// Already at /players
router.route('/')
    .get(function(req, res) {
        mongoose.model('Player').find({}, function(err, courses) {
            if (err) {
                Responses.standardError(res, err);
            } else {
                Responses.standardResponse(res, courses);
            }
        });
    })
    .post(function(req, res) {
        mongoose.model('Player').create(req.body, (err, player) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                Responses.standardResponse(res, player);
            }
        });
    });

router.route('/:pid')
    .get(function(req, res) {
        mongoose.model('Player').find({_id: req.params.pid}, function(err, courses) {
            if (err) {
                Responses.standardError(res, err);
            } else {
                Responses.standardResponse(res, courses);
            }
        });
    })
    .put(function(req, res) {
        mongoose.model('Player').findOne({
            _id: req.params.id
        }, (err, player) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                _.assign(player, req.body);
                player.save(function(err) {
                    if (err) {
                        Responses.standardError(res, err);
                    } else {
                        Responses.standardResponse(res, player);
                    }
                });
            }
        });
    })
    .delete(function(req, res) {
        mongoose.model('Player').findOne({
            _id: req.params.id
        }, (err, player) => {
            if (err) {
                Responses.standardError(res, err);
            } else {
                _.assign(player, req.body);
                player.remove(function(err) {
                    if (err) {
                        Responses.standardError(res, err);
                    } else {
                        Responses.standardResponse(res, player);
                    }
                });
            }
        });
    });

router.route('/:pid/round/:rid')
    .get(function(req, res) {

    })
    .put(function(req, res) {

    })
    .post(function(req, res) {

    })
    .delete(function(req, res) {

    });

module.exports = router;
