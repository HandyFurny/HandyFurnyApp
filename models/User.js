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
  location: {type: {type: String, default: "type your adress"},coordinates:[Number], default:[]}
});

userSchema.index({ adress: '2dsphere' });

module.exports = mongoose.model('User', userSchema);