var Ingredient = require('./model').ingredient;
var utils   = require('../utils');
var config = require('../config');

module.exports = {
    getIngredients : function(req, res) {
    	Ingredient.find({}, function(err, ingredients) {
    		if(err) throw err;
    		res.json(ingredients);
    	});
    },
    
    getIngredientById : function(req, res) {
    	Ingredient.findOne({
    		_id: req.params.id
    	}, function(err, ingredient) {
    		if (err || !ingredient) {
    			res.status(404).json({success: false, message: 'Ingredient not found.'});
    			return console.error(err);
    		}
    		res.json(ingredient);
    	});
    },
    
    postIngredient : function(req, res) {
    	var data = utils.mask_obj(req.body, config.model.ingredient);
    	data.owner_id = req.user._id;
    	var ingredient = new Ingredient(data);
    	ingredient.save(function(err) {
    		if (err) {
    			res.json({success: false, message:err});
    			return console.error(err);
    		}
    		console.log('Ingredient send successfully');
    		res.json({success: true, message:"Ingredient send successfully"});
    	});
    },
    
    getIngredientsByOwner : function(req, res) {
        Ingredient.find({
    		owner_id: req.params.id
    	}, function(err, ingredients) {
    		if (err || !ingredients) {
    			res.status(404).json({success: false, message: 'Ingredients not found.'});
    			return console.error(err);
    		}
    		res.json(ingredients);
    	});
    }
};