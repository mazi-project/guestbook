'use strict';

var _ = require('underscore')
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var fse = require('fs-extra');
var async = require('async');

var Utils = r_require('/utils/utils');
var Comment = r_require('/models/comment');

// Define Model Schema
var submissionSchema = mongoose.Schema({

	_id: { type: String, default: uuid.v4 }, //use uuid

    title: { type: String, maxlength: 120 },
    text : { type: String, required: true, maxlength: '1500' },
    author: { type: String, required: true, maxlength: '60' },
    device: { type: String, default: false },
    tags : [ { type: String, match: /^\w+$/ } ], //only allow numbers and chars and _ without spaces
    dataset : { type: String, default: 'default'}, //which dataset does this post belong to?
    files : [{
        name: String,
        path: String,
        filetype: String
    }],
    location : { type: [ Number ], default: [ 0 ] }, // [ longitude, latitude ]
    comments: [{ type: String, ref: 'Comment'}]

}, { timestamps: true });

submissionSchema.pre('remove', function(next) {

    // also remove all the assigned comments
    Comment.remove({ submission: this._id }, (err) => {
        if (err)
            next(err);

         //remove file directory
        var dir = Config.fileDir + '/' + this._id + '/';
        fse.remove(dir, (err) => {
            next(err);
        });
    });
});

submissionSchema.pre('save', function(next) {

    Utils.escapePath(this,'text');
    Utils.escapePath(this,'author');
    Utils.escapePath(this,'device');

    //dont allow false or null tags
    if (this.get('tags') == null || this.get('tags') == false)
        this.set('tags',[]);

    return next();

});

// Remove All entries
submissionSchema.statics.removeAll = function(callback) {
    this.remove({},callback);
};

submissionSchema.statics.remove = function(query,callback) {
	this.find(query, function(err,models) {
        if (err) {
            callback(err);
            return;
        }

        async.each(models, (model,done) => {
            model.remove(done);
        }, (err) => {
            callback(err,{ result: {n: models.length }});
        });
    });
};

submissionSchema.methods.addComment = function(comment,callback) {

    comment.submission = this._id;

    //save comment
    comment.save((err,comment) => {
        if (err) {
            callback(err)
            return;
        }

        //add ref to model
        this.comments.push(comment._id);
        this.save((err, submission) => {
            if (err) {
                callback(err)
                return;
            } 
            callback(null,comment);
        });
    })
}

submissionSchema.methods.removeComment = function(comment_id,callback) {
    var self = this;

    // first remove comment from database
    Comment.remove({ _id : comment_id}, function(err) {
        if (err) {
            callback(err)
            return;
        }

        // remove comment ref from model
        self.comments = _.reject(self.comments, function(comment) {
            return comment == comment_id;
        });

        //save model
        self.save(callback)
    });
}

submissionSchema.methods.addFile = function(file,callback) {

    var self = this;
    var dir = Config.fileDir + this._id + '/'
    var fileName = _.escape(file.originalFilename);

    //create dir
    fse.ensureDir(dir, (err) => {
        if (err) {
            callback(err)
            return;
        }

        //move file
        fse.move(file.path,dir+fileName, (err) => {
            if (err) { // cannot copy file
                fse.remove(file.path, () => {
                    callback(err)
                    return;
                })
            } else {
                //add to submission
                var newfile = {
                    name: fileName,
                    path: dir+file.originalFilename,
                    filetype: file.type
                };
                self.files.push(newfile);

                //save submission
                self.save(callback);
            }
        });
    });
}

module.exports = mongoose.model('Submission', submissionSchema, Config.submissionCollection);
