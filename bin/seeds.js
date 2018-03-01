const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/handyfurniture')
const User = require("../models/User");
const Chat = require("../models/Chat");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);


// const users = [
// {
//     email       : "a",
//     username    : "a",
//     password    : bcrypt.hashSync("a", salt),
//     profilePic  : "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250",
//     favorite    :[],
//     location : {
//         type: 'Point',
//         coordinates: [19.3980378,-99.1729519]
//     }
// },
// {
//     email       : "b",
//     username    : "b",
//     password    : bcrypt.hashSync("b", salt),
//     profilePic  : "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250",
//     favorite    :[],
//     location : {
//         type: 'Point',
//         coordinates: [19.3982371,-99.1724198]
//     }
// },
// {
//     email       : "c",
//     username    : "c",
//     password    : bcrypt.hashSync("c", salt),
//     profilePic  : "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250",
//     favorite    :[],
//     location : {
//         type: 'Point',
//         coordinates: [21.3982371,-89.1724198]
//     }
// },
// {
//     email       : "d",
//     username    : "d",
//     password    : bcrypt.hashSync("d", salt),
//     profilePic  : "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250",
//     favorite    :[],
//     location : {
//         type: 'Point',
//         coordinates: [15.3982371,-95.1724198]
//     }
// }
// ];

// User.create(users, function(err, result){
//     if(err) console.log("error");
//     console.log("lo lograste!", result);
//     mongoose.connection.close();
// });





