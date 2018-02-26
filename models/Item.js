const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./Item_types');

const itemSchema = new Schema({
  _creator      : { type: Schema.Types.ObjectId, ref: 'User', required: true  },
  title         : { type: String, required: true  },
  description   : { type: String, required: true  },
  category      : { type: String, enum: TYPES, required: true },
  price         : { type: Number, required: true  },
  views         : { type: Number, required: true  },
  itemPic       : { type: String, required: true  }
},{
  timestamps    : {createdAt: "created_at", updatedAt: "updated_at"}

});

module.exports = mongoose.model('Item', itemSchema);