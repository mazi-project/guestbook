'use strict';

var assert = require('assert');
var _ = require('underscore');
var async = require('async');

var Submission = r_require('models/submission');
var Comment = r_require('models/comment');

var SOCKET_SERVER_URL = "http://localhost:"+Config.port
var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl
var MODEL_NUMBER = 10
var TEST_FILES = ['tests/files/img1.jpg','tests/files/img2.png']

describe('Socket Tests', function(){

    // sets thest timeout to 500 ms
    this.timeout(2000);

    var randomNumber = Math.floor(Math.random() * 1000);

    before(function(done) {

        r_require('database/database').connect((err) => {
            if (err) throw err;

            // Add some Models
            var size = Math.floor(5 + Math.random() * 10)
            var array = _.map(_.range(size), function(i) {
                return {
                  text: 'model'+i,
                  author: 'Test Peter'
                }
            });
            Submission.create(array, function(err,models) {
                done();
            });
        });
    });

    after(function(done) {
        async.parallel([
            (callback) => { Submission.removeAll(callback) },
            (callback) => { Comment.removeAll(callback) },
        ],() => {
            r_require('database/database').disconnect();
            done();
        }); 
    });

    it("should connect to socket server", function(done) {

        var socketIoClient = require('socket.io-client')

        var socket = socketIoClient.connect(SOCKET_SERVER_URL)
        socket.on('connect', function () { 
          socket.disconnect();
        });
        socket.on('disconnect', () => { done(null) });
    });

    it("should receive submission:new message", function(done) {

        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        var socket = socketIoClient.connect(SOCKET_SERVER_URL)
        socket.on('submission:new', function (data) {
            assert.equal(randomNumber, data.model.text)
            socket.disconnect();
        });
        socket.on('disconnect', () => { done(null) });

        // post message
        request(BASE_URL).post('api/submissions').send({ text: randomNumber, author: 'Test Peter' }).end(function(err, res) {
        	if (err) throw err;
        });
    });

    it("should receive submission:removed message", function(done) {

        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        request(BASE_URL).get('api/submissions/').end(function(err, res) {
            if (err) throw err;

            var submissionId = res.body.docs[0]._id;

            var socket = socketIoClient.connect(SOCKET_SERVER_URL)
            socket.on('submission:removed', function (data) {

               assert.equal(data.id, submissionId)
               socket.disconnect();
            });
            socket.on('disconnect', () => { done(null) });

            // delete submission
            request(BASE_URL).delete('api/submissions/'+submissionId).auth(Config.authName, Config.authPassword).end(function(err, res) {
               if (err) throw err;
            });
        });

        
    });

    it("should receive submission:changed message on new comment", function(done) {
        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        request(BASE_URL).get('api/submissions/').end(function(err, res) {
            if (err) throw err;

            var submissionId = res.body.docs[0]._id;
            var nComments = res.body.docs[0].comments.length

            var socket = socketIoClient.connect(SOCKET_SERVER_URL)
            socket.on('submission:changed', function (data) {
                assert.equal(data.model.comments.length, nComments + 1);
                socket.disconnect();
            });
            socket.on('disconnect', () => { done(null) });

            // add comment
            request(BASE_URL).post('api/comments/').send({ text: 'sockettest', submission: submissionId}).end(function(err, res) {
               if (err) throw err;
            });
        });
    });

    it("should receive submission:changed message on new file post", function(done) {
        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        //create submission
        request(BASE_URL).get('api/submissions/').end(function(err, res) {
            if (err) throw err;

            var submissionId = res.body.docs[0]._id;

            var socket = socketIoClient.connect(SOCKET_SERVER_URL)
            socket.on('submission:changed', function (data) {
                assert.equal(data.model.files.length, 1);
                socket.disconnect();
            });
            socket.on('disconnect', () => { done(null) });

            request(BASE_URL).post('api/file/attach/'+submissionId).attach('file', TEST_FILES[0]).end(function(err, res) {
                if (err) throw err;
            });
        });
    });

    it("should receive submission:changed message on comment deletion", function(done) {
        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        var first = true;

        //create submission
        request(BASE_URL).get('api/submissions/').end(function(err, res) {
            if (err) throw err;

            var submissionId = res.body.docs[0]._id;
            var nComments = res.body.docs[0].comments.length

            var socket = socketIoClient.connect(SOCKET_SERVER_URL)
            socket.on('submission:changed', function (data) {
                if (nComments == data.model.comments.length)
                    socket.disconnect();
            });
            socket.on('disconnect', () => { done(null) });

            // add one comment
            request(BASE_URL).post('api/comments/').send({ text: 'sockettest', submission: submissionId}).end(function(err, res) {
               if (err) throw err;

               //remove one comment
               request(BASE_URL).delete('api/comments/'+res.body._id).auth(Config.authName, Config.authPassword).expect(200).end(function(err, res) {
                   if (err) throw err;
                });

            });
        });
    });

    it.skip("should receive submission:new message in namespace /tablet", function(done) {

        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        var socket = socketIoClient.connect(SOCKET_SERVER_URL+"/tablet")
        socket.on('submission:new', function (data) {
            assert.equal(randomNumber, data.model.message)
            socket.disconnect();
        });
        socket.on('disconnect', () => { done(null) });

        // post message
        request(BASE_URL).post('api/submissions').send({ message: randomNumber }).end(function(err, res) {
           if (err) throw err;
        });
    });

    it.skip("should receive feedback:scanning message in tablet namespace", function(done) {

        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        var PROGRESS_VALUE = Math.floor(Math.random() * 100)

        var socket = socketIoClient.connect(SOCKET_SERVER_URL);
        socket.on('feedback:scanning', function (data) {
           assert.equal(data.progress, PROGRESS_VALUE);
           socket.disconnect();
        });
        socket.on('disconnect', () => { done(null) });

		// send message to server
		socket.emit('feedback:scanning',PROGRESS_VALUE);
    });

    it.skip("should NOT receive feedback:scanning message in main namespace", function(done) {

    var socketIoClient = require('socket.io-client')
    var request = require('supertest');

    var PROGRESS_VALUE = Math.floor(Math.random() * 100)

    var socket = socketIoClient.connect(SOCKET_SERVER_URL);
    socket.on('feedback:scanning', function (data) {
        assert(false); // fails when receiving message
        socket.disconnect();
    });
    socket.on('disconnect', () => { done(null) });

      // send message to server
      socket.emit('feedback:scanning',PROGRESS_VALUE);

      //succeed after timeout
      setTimeout(done, 250);
      
    });

})
