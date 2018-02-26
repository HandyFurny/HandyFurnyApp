const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const chatSchema = new Schema({
  _ownerBuyer   : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  _userSeller   : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messages      : [String],
},{
  timestamps    : {createdAt: "created_at", updatedAt: "updated_at"}

});

module.exports = mongoose.model('Chat', chatSchema);