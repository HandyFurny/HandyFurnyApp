const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  _owner        : { type: String, required: true },
  _userSeller   : { type: String, required: true },
  description   : { type: String, required: true },
  rate          : { type: Number, required: true },
},{
  timestamps    : {createdAt: "created_at", updatedAt: "updated_at"}

});

module.exports = mongoose.model('Review', reviewSchema);