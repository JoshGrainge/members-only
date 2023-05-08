const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: String, defualt: Date.now() }
})

MessageSchema.virtual('date').get(function () {
  // Have to do this to convert string to date string, then string date to date, then format (very weird)
  const date = Date(this.timestamp);
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US');
});

module.exports = mongoose.model('Message', MessageSchema);