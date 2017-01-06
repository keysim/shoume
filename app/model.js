var mongoose = require('mongoose');
var config = require('../config');
var Schema = mongoose.Schema;


var toJsonClean = { // remove __v and set _id to id ! =D
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         //delete ret._id;
         //delete ret.__v;
     }
};

// set up a mongoose models
module.exports = {
    "user"          :   mongoose.model('User', new Schema(config.model.user).set('toJSON', toJsonClean)),
    "moment"        :   mongoose.model('Moment', new Schema(config.model.moment).set('toJSON', toJsonClean)),
    "ingredient"    :   mongoose.model('Ingredient', new Schema(config.model.ingredient).set('toJSON', toJsonClean)),
    "recipe"        :   mongoose.model('Recipe', new Schema(config.model.recipe).set('toJSON', toJsonClean)),
    "comment"       :   mongoose.model('Comment', new Schema(config.model.comment).set('toJSON', toJsonClean))
};