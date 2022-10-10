const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuList = new Schema({
name : {
    type : String,
    require : true
},
price : {
    type : String,
    require : true
}
});

const dbmodel = mongoose.model('menuList',menuList);
module.exports = dbmodel;