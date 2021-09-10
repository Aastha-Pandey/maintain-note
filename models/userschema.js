const mongoose = require('mongoose');

const userScehma = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const user = mongoose.model('USER', userScehma);

module.exports = user;
