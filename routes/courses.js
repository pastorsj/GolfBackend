var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride(function(req, res) {
    if(req.body && typeof req.body == 'object' && '_method' in req.body) {
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
        
    })
    .post(function(req, res) {
        
    })
    .delete(function(req, res) {

    })
    
module.exports = router;