const string = require('joi/lib/types/string');
var mongoose = require('mongoose');
 
var artSchema = new mongoose.Schema({
    artist: String,
    desc: String,
    img: String

});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('art', artSchema);