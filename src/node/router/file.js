'use strict';

var express = require('express');
var _ = require('underscore');
var multipart = require('connect-multiparty');
var fse = require('fs-extra');

var appEvents = r_require('/utils/appEvents.js');
var Submission = r_require('/models/submission');
var Utils = r_require('/utils/utils');

var router = express.Router();

var fileUploader = multipart({
    uploadDir: Config.uploadDirTmp,
    autoFiles: true,
    maxFileSize: Config.maxFileSize
});

/*
 * POST /api/file/attach/:submissionId
 */ 
router.post('/attach/:submissionId', fileUploader, function(req,res){

    print('attaching file');

	Submission.findOne({ _id: req.params.submissionId }, (err, submission) => {
		if (Utils.handleError(err,res)) return;

        if (!submission) {
            Utils.handleError({ message: 'Id not found.' },res);
        	return;
        }

        if (!req.files.file) {
            Utils.handleError({ message: 'No file submitted.' },res);
            return;
        }
		
        var file = req.files.file;
        
        //check file size
        if (file.size > Config.maxFileSize) {
            Utils.handleError({ message: 'File is too big, only '+Config.maxFileSize/1024+'KB allowed.' },res);
            fse.remove(file.path);
            return;
        }

        //check extension
        if (!(_.contains(Config.allowedFileTypes,file.type))) {
            Utils.handleError({ message: 'Only jpg,gif and png images are allowed for upload. File is '+file.type },res);
            fse.remove(file.path);
            return;
        }

        submission.addFile(file, (err,model) => {
        	if (Utils.handleError(err,res)) return;

            print('Uploaded file'+file.originalFilename+' for '+req.params.submissionId);

            appEvents.emit('submission:changed',submission);
			res.send(model);
        });
	});
});

module.exports = router;
