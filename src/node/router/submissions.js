'use strict';

var express = require('express');
var _ = require('underscore');
var htmlspecialchars = require('htmlspecialchars');

var appEvents = r_require('/utils/appEvents.js');
var Utils = r_require('/utils/utils');

var Submission = r_require('/models/submission');

var Auth = r_require('/router/_authentification');

var router = express.Router();

/*
 * GET /api/submissions/
 */ 
router.get('/',(req,res) => {

    //get qury options
    var options = {}
    if (_.has(req.query,'tag'))
        options.tags = req.query.tag;
    if (_.has(req.query,'dataset'))
        options.dataset = req.query.dataset;

    // paginate options
    var paginateOptions = {}
    if (_.has(req.query,'limit'))
        paginateOptions.limit = parseInt(req.query.limit);

    if (_.has(req.query,'skip'))
        paginateOptions.skip = parseInt(req.query.skip);

    // build query
    var query = Submission.find(options);
    query.sort({'updatedAt': -1});
    query.limit(paginateOptions.limit);
    query.skip(paginateOptions.skip);
    query.populate('comments');

    // execute
    query.exec((err,models) => {
        if (Utils.handleError(err,res)) return;

        Submission.count(options, (err, count) => {
            if (Utils.handleError(err,res)) return;

            res.send({
                docs : models,
                total_records : count
            });
        });
    });
});

/*
 * GET /api/submissions/:id
 */ 
router.get('/:id',(req,res) => {
    Submission.findOne({ _id: req.params.id}).populate('comments').exec((err,model) => {
        if (Utils.handleError(err,res)) return;

        res.send(model);
    });
});

/*
 * POST /api/submissions/
 */ 
router.post('/', (req, res) => {

    var submission = new Submission(req.body);
    
    //only allow new comments
    delete submission['_id'];

    //insert data
    submission.save((err, model) => {
        if (Utils.handleError(err,res))
            return;

        print('Submission added to database');

        // trigger socket event and send message to web app
        appEvents.emit('submission:new',model)
        res.send(model);
    });
});

/*
 * PUT /api/submissions/:id with AUTH
 */
router.put('/:id', Auth.authentificate, (req, res) => {
 
    var data = req.body;

    //insert data
    Submission.findOneAndUpdate({ _id : req.params.id }, data, {new: true}, (err, model) => {
        if (Utils.handleError(err,res)) return;

        print('Submission changed in database');

        // trigger socket event and send message to web app
        appEvents.emit('submission:changed',model)
        res.send(model);
    });
});

/*
 * DELETE /api/submissions/:id with AUTH
 */
router.delete('/:id', Auth.authentificate, (req, res) => {
    Submission.remove({ _id: req.params.id }, (err, obj) => {
        if (Utils.handleError(err,res)) return;

        if (obj.result.n > 0) {
            print("Submission "+req.params.id+" deleted from database");
            appEvents.emit('submission:removed',req.params.id)
        }
        res.send( {removed: obj.result.n} );
    });
});

module.exports = router;