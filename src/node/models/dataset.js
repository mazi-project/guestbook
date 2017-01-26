'use strict';

var _ = require('underscore')
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Utils = r_require('/utils/utils');
var Submission = r_require('/models/submission');

// Define Model Schema
var datasetSchema = mongoose.Schema({

	_id: { type: String, default: uuid.v4 }, //use uuid
	name: { type: String },
	title: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema, Config.commentCollection);