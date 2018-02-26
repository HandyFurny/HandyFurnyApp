const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email       : { type: String},
  username    : { type: String ,trim:true},
  password    : { type: String},
  profilePic  : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" },
  //social login con passport
  facebookID  : { type: String},
  googleID    : { type: String},
  location: {type: {type: String, default: "type your adress"},coordinates:[Number], default:[]}
});

userSchema.index({ adress: '2dsphere' });

module.exports = mongoose.model('User', userSchema);