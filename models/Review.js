const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  _owner        : { type: Schema.Types.ObjectId, ref: 'User', required: true  },
  _userSeller   : { type: Schema.Types.ObjectId, ref: 'User', required: true  },
  description   : { type: String, required: true },
  rate          : { type: Number, required: true },
},{
  timestamps    : {createdAt: "created_at", updatedAt: "updated_at"}

});

module.exports = mongoose.model('Review', reviewSchema);

//Review.find({_userSeller:req.params.id})
// .populate("_userSeller")
// .populate("_owner")
// .then(reviews => {
//   console.log(reviews)  
//   Item.find({_creator:req.params.id})
//     .then(items =>{
//       res.render("user/profile",{user,items,reviews, owner})
//       })
//       .catch(err => res.render('error'));        
// })
// .catch(err => res.render('error',{message:err}))