var Recipe = require('./model').recipe;
var utils   = require('../utils');
var config = require('../config');

module.exports = {
    
    getRecipes : function(req, res) {
    	Recipe.find({}, function(err, recipes) {
    		if(err) throw err;
    		res.json(recipes);
    	});
    },
    
    getRecipeById : function(req, res) {
    	Recipe.findOne({
    		_id: req.params.id
    	}, function(err, recipe) {
    		if (err || !recipe) {
    			res.status(404).json({success: false, message: 'Recipe not found.'});
    			return console.error(err);
    		}
    		res.json(recipe);
    	});
    },
    
    postRecipe : function(req, res) {
    	var data = utils.mask_obj(req.body, config.model.recipe);
    	data.owner_id = req.user._id;
    	var recipe = new Recipe(data);
    	recipe.save(function(err) {
    		if (err) {
    			res.json({success: false, message:err});
    			return console.error(err);
    		}
    		console.log('Recipe send successfully');
    		res.json({success: true, message:"Recipe send successfully"});
    	});
    },
    
    getRecipeByOwner : function(req, res) {
        Recipe.find({
    		owner_id: req.params.id
    	}, function(err, recipes) {
    		if (err || !recipes) {
    			res.status(404).json({success: false, message: 'Recipes not found.'});
    			return console.error(err);
    		}
    		res.json(recipes);
    	});
    }
};