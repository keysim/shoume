var Comment = require('./model').comment;
var utils   = require('../utils');
var config = require('../config');

module.exports = {
    commentMoment : function(req, res) {
    	var data = utils.mask_obj(req.body, config.model.comment);
    	data.owner_id = req.user._id;
    	data.moment_id = req.params.id
    	data.owner_login = req.user.login;
    	var comment = new Comment(data);
    	comment.save(function(err) {
    		if (err) {
    			res.json({success: false, message:err});
    			return console.error(err);
    		}
    		console.log('Comment send successfully');
    		res.json({success: true, message:"Comment sent successfully"});
    	});
    },
    
    commentRecipe : function(req, res) {
    	var data = utils.mask_obj(req.body, config.model.comment);
    	data.owner_id = req.user._id;
    	data.recipe_id = req.params.id;
    	data.owner_login = req.user.login;
    	var comment = new Comment(data);
    	comment.save(function(err) {
    		if (err) {
    			res.json({success: false, message:err});
    			return console.error(err);
    		}
    		console.log('Comment send successfully');
    		res.json({success: true, message:"Comment sent successfully"});
    	});
    },
    
    getCommentByMoment : function(req, res) {
        Comment.find({
    		moment_id: req.params.id
    	}, function(err, comments) {
    		if (err || !comments) {
    			res.status(404).json({success: false, message: 'Comments not found.'});
    			return console.error(err);
    		}
    		res.json(comments);
    	});
    },
    
    getCommentByRecipe : function(req, res) {
        Comment.find({
    		recipe_id: req.params.id
    	}, function(err, comments) {
    		if (err || !comments) {
    			res.status(404).json({success: false, message: 'Comments not found.'});
    			return console.error(err);
    		}
    		res.json(comments);
    	});
    }
};