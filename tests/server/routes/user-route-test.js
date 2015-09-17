var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Posting = mongoose.model('Posting');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
  var postAgent=supertest.agent(app);

describe('Members Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });
  var createdUsers;
  var createdPosts;

  beforeEach('Creating users', function (done) {
    var usersToCreate = [
      {
        email: 'steve@rogers.com',
        password: 'iceicebaby'
      },
      {
        email: 'natasha@romanoff.com',
        password: 'thedeadliestofallspiders'
      },
      {
        email: 'tony@stark.com',
        password: 'iamironman'
      }
    ];

    User.create(usersToCreate).then(function (users) {
      createdUsers = users;
      done();
    });
  });

  beforeEach('Postings', function(done){
    
    var postings = [
      {
        client: createdUsers[0]._id,
        title: 'The Hulk on the moon',
        status: 'complete'
      },{
        client:createdUsers[1]._id,
        title:'The Hulk at ballet practice'
      },{
        client:createdUsers[2]._id,
        title:'Hawkeye recumbent in a field'
      }
    ];
    Posting.create(postings).then(function(posts){
      createdPosts=posts;
      done();
    })
  })

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });


  describe('Returning users',function(){

    it('should return all users as array',function(done){
      postAgent.get('/api/users/').expect(200).end(function(err,response){
        if(err) return done(err);
        expect(response.body).to.be.an('array');
        done();
      });
    });

  });

  describe('Returning specific user',function(){

    it('should return all info for specific user',function(done){
      postAgent.get('/api/users/' + createdUsers[0]._id).expect(200).end(function(err,response){
        if(err) return done(err);
        expect(response.body._id).to.equal(createdUsers[0]._id.toString());
        done();
      });
    });

  });

  describe('get /:userId/requested',function(){

    it('should return posts that user has requested',function(done){
      postAgent.get('/api/users/' + createdUsers[0]._id+'/requested').expect(200).end(function(err,response){
        if(err) return done(err);
        expect(response.body).to.be.an('array');
        done();
      });
    });

  });

  describe('get /:userId/postings/done',function(){

    it('should return posts that user has completed',function(done){
      postAgent.get('/api/users/' + createdUsers[0]._id+'/postings/done').expect(200).end(function(err,response){
        if(err) return done(err);
        expect(response.body).to.be.an('array');
        expect(response.body[0].title).to.equal(createdPosts[0].title);
        done();
      });
    });

  });

  describe('get /:userId/postings/unassigned',function(){

    it('should return posts that user has no artist for',function(done){
      postAgent.get('/api/users/' + createdUsers[0]._id+'/unassigned').expect(200).end(function(err,response){
        if(err) return done(err);
        expect(response.body).to.be.an('array');
        expect(response.body[0].title).to.equal(createdPosts[0].title);
        done();
      });
    });

  });

	//describe('basic get route')


})
