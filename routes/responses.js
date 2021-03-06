'use strict';
const Responses = {
    standardError: function(res, err, errCode) {
        res.status(errCode || 500);
        res.format({
            json: function() {
                res.json({message: err.errmsg, error: err});
            }
        });
    },
    standardResponse: function(res, response) {
        res.format({
            json: function() {
                res.json(response);
            }
        });
    }
};

module.exports = Responses;
