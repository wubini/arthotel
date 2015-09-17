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

// describe('Posting ID Tests',function(){
// 	it('should ',function(done){
// 		postAgent.use('/:'+createdUsers[0]._id).expect(200).end(function(err,response){
// 			if(err) return (err);
// 			expect(response.body)
// 		})
// 	})


// })



// describe('All Posts',function(){

// })
describe('Posting an item and checking cart maintains previous status after login',function(){
	var guestAgent;
	var loggedInAgent;
	var holdPostTitle;
	// beforeEach('create guest agents',function(){
	// 	guestAgent = supertest.agent(app);
	// 	//req.session.cart = createdPosts[0];
	// 	//var holding = req.session.cart;
	// })
	createdPosts[0].artistsWhoSaved=createdUsers[0]._id;
	beforeEach('now create logged in user',function(done){
		loggedInAgent= supertest.agent(app);
		loggedInAgent.post('/login').send(createdUsers[0]).end(done);
	})
	//var loggedOutSession= req.session.cart;
	it('should post a postingId properly',function(done){
		postAgent.post("/api/postings/"+createdPosts[0]._id).expect(200).end(function(err,response){
			if(err) return done(err);
			console.log("i am the response body",response.body);
			expect(response.body.title).to.equal(createdPosts[0].title);
			done();
		})
	})
	it('should successfully hit user route for saved posts to compare in next test',function(done){
		postAgent.get('/api/users/'+createdUsers[0]._id+'/saved').expect(200).end(function(err, response){
			if(err) return done(err);
			var holdPostTitle = response.body;
			console.log(" I am the body", holdPostTitle);
			done();
		})
	})

	it('should ensure cart status integrity',function(done){
		loggedInAgent.put('/api/postings').expect(200).end(function(err,response){
			if(err) return done(err);
			console.log("yo I'm the next body", response.body[0]);
			expect(response.body[0]).to.equal(holdPostTitle);
			done();
		})
		// want to create new logged in agent
		// to compare and then check if cart is still same

	})
})




})