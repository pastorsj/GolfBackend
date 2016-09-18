var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  permission: {
    type: String,
    required: true
  }
});

mongoose.model('User', userSchema);