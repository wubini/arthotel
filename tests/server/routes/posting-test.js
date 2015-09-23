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


	describe('Returning Posts',function(){

		it('should return all posts as array',function(done){
			postAgent.get('/api/postings/').expect(200).end(function(err,response){
				if(err) return done(err);
				expect(response.body).to.be.an('array');
				done();
			});
		});

	});

	describe('add new post',function(){
					it('should save a new post to the database',function(done){
							var post = {
								title: 'test title',
								description: 'sup',
								client: createdUsers[0]._id
							};
						postAgent.post('/api/postings/add/newPost').send({postInfo: post}).end(function(err,response){
							if(err) return done(err);
							expect(response.body.title).to.exist;
							expect(response.body.description).to.exist;
							done();
						})
					})
	});

	describe('post /:postingId',function(){

		it('allows artist to save a posting',function(done){
			postAgent.post(`/api/postings/${createdPosts[0]._id}`).send({action: 'save'}).end(function(err,response){
				if(err) return done(err);
				expect(response.body.artistsWhoSaved).to.exist;
				done();
			})
		})

		it('allows artist to request a posting',function(done){
			postAgent.post(`/api/postings/${createdPosts[0]._id}`).send({action: 'request'}).end(function(err,response){
				if(err) return done(err);
				expect(response.body.artistsWhoRequested).to.exist;
				done();
			})
		})


	});

	describe('put /:postingId',function(){

		it('allows client to add an artist to a project',function(done){
			postAgent.put('/api/postings/'+createdPosts[0]._id).send({accept: createdUsers[0]._id}).end(function(err,response){
				if(err) return done(err);
				expect(response.body.artist).to.exist;
				expect(response.body.artistsWhoRequested).to.be.empty;
				done();
			})
		})

		it('allows client to reject an artist',function(done){
			postAgent.put('/api/postings/'+createdPosts[0]._id).send({reject: createdUsers[0]._id}).end(function(err,response){
				if(err) return done(err);
				expect(response.body.artistsWhoRequested).to.not.include.members([createdUsers[0]._id]);
				done();
			})
		})

	});

	describe('Posting an item and checking cart maintains previous status after login',function(){
		var guestAgent;
		var loggedInAgent;
		var holdPostTitle;
		// beforeEach('create guest agents',function(){
		// 	guestAgent = supertest.agent(app);
		// 	//req.session.cart = createdPosts[0];
		// 	//var holding = req.session.cart;
		// })
		beforeEach('now create logged in user',function(done){
			loggedInAgent= supertest.agent(app);
			loggedInAgent.post('/login').send(createdUsers[0]).end(done);
			createdPosts[0].artistsWhoSaved=createdUsers[0]._id;

		});


		it('should successfully hit user route for saved posts to compare in next test',function(done){
			postAgent.get('/api/users/'+createdUsers[0]._id+'/saved').expect(200).end(function(err, response){
				if(err) return done(err);
				var holdPostTitle = response.body;
				done();
			});
		});

		it('should ensure cart status integrity',function(done){
			loggedInAgent.put('/api/postings').expect(200).end(function(err,response){
				if(err) return done(err);
				expect(response.body[0]).to.equal(holdPostTitle);
				done();
			});
			// want to create new logged in agent
			// to compare and then check if cart is still same

		});
	});

});
