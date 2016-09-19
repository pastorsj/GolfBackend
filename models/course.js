var mongoose = require('mongoose');
var courseSchema = new mongoose.Schema({
    par: {
        type: Number,
        required: true
    },
    holes: [Number],
    slope: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

mongoose.model('Course', courseSchema);
