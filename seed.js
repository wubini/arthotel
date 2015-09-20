/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Posting = Promise.promisifyAll(mongoose.model('Posting'));

var seedUsers = function() {

  var users = [{
    displayName: "Kathy Lu",
    email: 'kathy',
    password: '123'
  }, {
    displayName: "Beckylee Dell",
    email: 'beckylee',
    password: '123',
    isAdmin: 'true'
  }, {
    displayName: "Austin Shoecraft",
    email: 'austin',
    password: '123'
  },{
    displayName: "David Scherban",
    email: "david",
    password: '123'
  }];

  return User.createAsync(users);
};

var seedPostings = function() {
  var users;
  var jobs;
  return User.find()
    .then(function(allUsers) {
      users = allUsers;
      jobs = [{}, {}, {}];
      counter = 1;
      jobs.forEach(function(job) {
        job.client = users[Math.floor(Math.random() * users.length)]._id;
        job.location = "New York";
        job.title = "Project " + counter++;
        job.description = "TBD";
        job.photos =
          ["http://cdn.sheknows.com/articles/2013/04/Puppy_2.jpg"];
        job.artistsWhoSaved = [
          users[Math.floor(Math.random() * users.length)]._id,
          users[Math.floor(Math.random() * users.length)]._id,
          users[Math.floor(Math.random() * users.length)]._id
        ];
        job.artistsWhoRequested = [
          {user: users[Math.floor(Math.random() * users.length)]._id, time: Date.now()},
          {user: users[Math.floor(Math.random() * users.length)]._id, time: Date.now()},
          {user: users[Math.floor(Math.random() * users.length)]._id, time: Date.now()}
        ];
        console.log("adding job", job);
      });

      return Posting.createAsync(jobs);
    });
};

connectToDb.then(function() {
  User.findAsync({}).then(function(users) {
      if (users.length === 0) {
        return seedUsers();
      } else {
        console.log(chalk.magenta(
          'Seems to already be user data, exiting!'));
        process.kill(0);
      }
    }).then(function() {
      console.log(chalk.green('Seeding users successful!'));
      return Posting.findAsync({}).then(function(jobs) {
        if (jobs.length === 0) {
          return seedPostings();
        } else {
          console.log(chalk.magenta(
            'Seems to already be jobs data, exiting!'));
          process.kill(0);
        }
      })
    }).then(function() {
      console.log(chalk.green("Seeding jobs successful!"));
    })
    .catch(function(err) {
      console.error(err);
      process.kill(1);
    });
});
