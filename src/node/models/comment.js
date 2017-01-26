'use strict';

var _ = require('underscore')
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Utils = r_require('/utils/utils');
var Submission = r_require('/models/submission');

// Define Model Schema
var commentSchema = mongoose.Schema({

	_id: { type: String, default: uuid.v4 }, //use uuid
	submission: { type: String, ref: 'Submission' },

    text : { type: String, required: true, maxlength: '800' },
    author: { type: String, default: 'anonymous', maxlength: '60' }

}, { timestamps: true });

commentSchema.pre('save', function(next) {

    Utils.escapePath(this,'text');
    Utils.escapePath(this,'author');

    return next();

});

// Remove All entries
commentSchema.statics.removeAll = function(callback) {
	this.remove({}, callback);
};

module.exports = mongoose.model('Comment', commentSchema, Config.commentCollection);