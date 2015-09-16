// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Posting = mongoose.model('Posting');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe("Postings' Routes",function(){
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
				title: 'The Hulk on the moon'
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
	var postAgent=supertest.agent(app);
describe('Returning Posts',function(){
	

	it('should return all posts as array',function(done){
		postAgent.get('/api/postings/').expect(200).end(function(err,response){
			if(err) return done(err);
			expect(response.body).to.be.an('array');
			done();
		})
	})

})
describe('Posting ID Tests',function(){
	it('should ',function(done){
		postAgent.use('/:')
	})


})


// describe('All Posts',function(){

// })

describe('New Artist Who Saved',function(){
	it('should ensure new artist is properly saved in database',function(done){
		postAgent.put('/api/postings').expect(200).end(function(err,response){
			if(err) return done(err);
			//expect()
		})
	})
})




})