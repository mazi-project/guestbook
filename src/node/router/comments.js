'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 12:43:57
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-26 11:17:22
*/

var express = require('express');
var _ = require('underscore');
var htmlspecialchars = require('htmlspecialchars');

var appEvents = r_require('/utils/appEvents.js');
var Utils = r_require('/utils/utils');

var Comment = r_require('/models/comment');
var Submission = r_require('/models/submission');

var Auth = r_require('/router/_authentification');

var router = express.Router();

/*
 * GET /api/comments/
 */ 
router.get('',(req,res) => {
    Comment.find({}, (err,models) => {
        if (Utils.handleError(err,res)) return;
        res.send(models);
    });
});

/*
 * GET /api/comments/:id
 */ 
router.get('/:id',(req,res) => {
    Comment.findOne({ _id: req.params.id} , (err,model) => {
        if (Utils.handleError(err,res)) return;
        res.send(model);
    });
});

/*
 * POST /api/comments/:id
 */ 
router.post('/', (req, res) => {

    var comment = new Comment(req.body)

    //only allow new comments
    delete comment['_id'];

    // insert comment
    Submission.findOne({ _id: req.body.submission }, (err,submission) => {
    	if (Utils.handleError(err,res)) return;

        if (!submission) {
            res.status(404).send({error: 'submission not found'});
            return;
        }

    	submission.addComment(comment, (err,comment) => {
    		if (Utils.handleError(err,res)) return;

            print('Comment added to Database');
    		appEvents.emit('submission:changed',submission);
    		res.send(comment);
    	});
    });
});

/*
 * DELETE /api/comments/:id with AUTH
 */
router.delete('/:id', Auth.authentificate, (req, res) => {

    //find comment for id
    Comment.findOne({ _id: req.params.id }).populate('submission').exec((err,comment) => {
        if (Utils.handleError(err,res)) return;

        if (!comment) {
            Utils.handleError({message: 'comment not found'},res);
            return;
        }

        var submission = new Submission(comment.submission);

        submission.removeComment(req.params.id, (err, newSubmission) => {
            if (Utils.handleError(err,res)) return;

            appEvents.emit('submission:changed',newSubmission);
            print("Comment "+req.params.id+" deleted from database");
            res.send( {removed: 1} );
        });
    });

});

module.exports = router;