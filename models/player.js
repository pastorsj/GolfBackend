var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    handicap: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rounds: [{
        _id: Schema.Types.ObjectId,
        holesPlayed: {
            type: Number,
            required: true
        },
        round: [Number],
        total: {
            type: Number,
            required: true
        },
        course: {
            type: Schema.Types.Mixed,
            required: true
        },
        tournament: {
            type: Schema.Types.Mixed,
            required: false
        },
    }]
});

mongoose.model('Player', playerSchema);