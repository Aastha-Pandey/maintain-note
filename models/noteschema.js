const mongoose = require('mongoose');

const noteScehma = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },

    title: {
      type: String,
    },
    note: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'note',
    },
    label: {
      type: String,
    },
    image: { type: String },
  },
  { timestamps: true }
);

const Note = mongoose.model('NOTE', noteScehma);
module.exports = Note;
