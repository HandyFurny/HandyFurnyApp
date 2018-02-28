const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const chatSchema = new Schema({
  _ownerBuyer   : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  _userSeller   : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  _itemID       :{ type: Schema.Types.ObjectId, ref: 'Item', required: true },
   messages      : [{
    text:String
  }],
},{
  timestamps    : {createdAt: "created_at", updatedAt: "updated_at"}

});

module.exports = mongoose.model('Chat', chatSchema);