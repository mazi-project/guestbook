'use strict';

var express = require('express');
var _ = require('underscore');

var appEvents = r_require('/utils/appEvents.js');

var router = express.Router();

/*
 * GET /api/feedback/scanning
 */ 
router.get('/scanning/:progress',function(req,res){
    appEvents.emit('feedback:scanning', req.params.progress)
    res.send();
});

module.exports = router;