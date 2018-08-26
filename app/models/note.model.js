const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name: {
      type: String,
      required: 'Kindly enter the name of the task'
    },
    content: {
      type: String,
      required: 'enter the messgae pal2'
  },
    Created_date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: [{
        type: String,
        enum: ['pending', 'ongoing', 'completed']
      }],
      default: ['pending']
    }
  });

module.exports = mongoose.model('Note', NoteSchema);
