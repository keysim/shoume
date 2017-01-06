var Moment   = require('./model').moment;
var utils   = require('../utils');
var config = require('../config');
//var mongoose    = require('mongoose');

module.exports = {
    
    getMoments : function(req, res) {
    	Moment.find({}, function(err, moments) {
    		if(err) throw err;
    		res.json(moments);
    	});
    },
    
    getMomentById : function(req, res) {
    	console.log(req.params.id);
    	Moment.findOne({name:req.params.id}, function(err, moment) {
    		console.log(moment);
    		if (err || !moment) {
    			res.status(404).json({success: false, message: 'Moment not found.'});
    			return console.error(err);
    		}
    		res.json(moment);
    	});
    },
    
    postMoment : function(req, res) {
    	var data = utils.mask_obj(req.body, config.model.moment);
    	data.owner_id = req.user._id;
    	var moment = new Moment(data);
    	moment.save(function(err) {
    		if (err) {
    			res.json({success: false, message:err});
    			return console.error(err);
    		}
    		console.log('Moment send successfully');
    		res.json({success: true, message:"Moment send successfully"});
    	});
    },
    
    getMomentByOwner : function(req, res) {
        Moment.find({
    		owner_id: req.params.id
    	}, function(err, moments) {
    		if (err || !moments) {
    			res.status(404).json({success: false, message: 'Moments not found.'});
    			return console.error(err);
    		}
    		res.json(moments);
    	});
    }
}