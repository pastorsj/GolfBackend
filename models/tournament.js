var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tournamentSchema = new Schema({
    course: {
        type: Schema.Types.Mixed,
        required: true
    },
    holes: {
        type: Date,
        required: true
    },
    players: [Schema.Types.Mixed]
});

mongoose.model('Tournamant', tournamentSchema);
