const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email       : { type: String},
  username    : { type: String ,trim:true},
  password    : { type: String},
  profilePic  : { type: String, default: "/images/profile.jpg" },
  //social login con passport
  facebookID  : { type: String},
  googleID    : { type: String},
  reviews     : [{ type: String, default: ''}],
  location    : {type: {type: String},coordinates:{type: [Number], default:[19.3978285, -99.1729289]},
  favorite    : [{ type: Schema.Types.ObjectId, ref: 'Item', required: true  }],
  
}
});

userSchema.index({ adress: '2dsphere' });

module.exports = mongoose.model('User', userSchema);