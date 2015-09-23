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
var _ = require('lodash');

var seedUsers = function() {

  var users = [{
    displayName: "Vincent Van Gogh",
    email: 'vincent@gmail.com',
    password: '123',
    isAdmin: 'false',
    photoUrl: 'http://fotonin.com/data_images/out/27/957682-vincent-van-gogh.jpg'
  }, {
    displayName: "Michelangelo Buonarroti",
    email: 'mbuonarroti@gmail.com',
    password: '123',
    isAdmin: 'false',
    photoUrl: 'http://media-1.web.britannica.com/eb-media/46/75046-004-E437D9A2.jpg'
  }, {
    displayName: "Pope Julius II",
    email: 'pope.julius.ii@gmail.com',
    password: '123',
    isAdmin: 'false',
    photoUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR7WLkbi9x41ryew0LKb_2OF3JZtPFIkTNZzSGYdciRRPoNESMSa9BNBiE'

  },{
      displayName: "Mona Lisa",
      email: 'mona.lisa@gmail.com',
      password: '123',
      isAdmin: 'false',
      photoUrl: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTfwWiOGCFGh_gakXkbQxPn_YvBO40RKat1-JAqAP9_z7Kj1l1c2A'
  },{
    displayName: "Georgia O'Keefe",
    email: "georgia@gmail.com",
    password: '123',
    isAdmin: 'false',
    photoUrl: 'http://www.lakegeorgemirrormagazine.com/wp-content/uploads/2011/08/GeorgiaOKeeffe1.jpg'
  },{
    displayName: "Frida Kahlo",
    email: "frida@gmail.com",
    password: '123',
    isAdmin: 'false',
    photoUrl: 'https://csjclriverside.files.wordpress.com/2015/06/frida-one.jpg'
  },{
    displayName: "Beckylee Dell",
    email: "beckylee.dell@gmail.com",
    password: '123',
    isAdmin: 'true',
    photoUrl: 'https://scontent-lga1-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/297097_2205381818970_996084724_n.jpg?oh=25a0c4bd3f6348fcf7cb8728001d39c5&oe=56600FCE'
  },{
    displayName: "Kathy Lu",
    email: "kaffy.lu@gmail.com",
    password: '123',
    isAdmin: 'true',
    photoUrl: 'https://scontent-lga1-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/1524808_10201298647488736_1676699008_n.jpg?oh=6936f1cb2662af08a8abf538320d9e69&oe=565EBCCC'
  },{
    displayName: "Austin Shoecraft",
    email: "tashoecraft@gmail.com",
    password: '123',
    isAdmin: 'true',
    photoUrl: 'https://scontent-lga1-1.xx.fbcdn.net/hphotos-frc3/v/t1.0-9/s720x720/558061_10153288038575381_1892333342_n.jpg?oh=bf4ac7b990a98314bee5f5418b7fbc19&oe=569F715B'
  }];

  return User.createAsync(users);
};

var seedPostings = function() {
  var users;
  var jobs;
  return User.find()
    .then(function(allUsers) {
      users = allUsers;
      var sistineChapel = {
        client: users[_.findIndex(users, function(user) {
          return user.displayName==="Pope Julius II";
        })]._id,
        title: "The Ceiling of My Chapel",
        description: "I have a huge ceiling but it's all blank.",
        photos: ['https://ka-perseus-images.s3.amazonaws.com/f2ab32b65ba04c038712c2a7988571d5d2d05b62.jpg'],
        tags: ["adam, god, babies, angels", "painting"]
      };
      var monaLisa = {
        client: users[_.findIndex(users, function(user) {
          return user.displayName==="Mona Lisa";
        })]._id,
        photos: ["http://www.almrsal.com/wp-content/uploads/2015/01/%D8%A7%D9%84%D9%85%D9%88%D9%84%D9%8A%D8%B2%D8%A7.jpg"],
        title: "A Portrait of Me Slightly Smiling",
        description: "Put perspective in the background.",
        tags: ["monalisa", "smile", "painting"]
      };
      var starryNight = {
        client: users[_.findIndex(users, function(user) {
          return user.displayName==="Beckylee Dell";
        })]._id,
        title: "Paint a Small Star-lit Town at Night",
        description: "Make sure it's really windy",
        photos: ['http://karmel.hr/wp-content/uploads/2015/03/van-gogh-starry-night-vincent-van-gogh.jpg'],
        tags: ["swirly", "town", "starry", "night", "painting"],
        status: 'complete',
        artist: users[_.findIndex(users, function(user) {
          return user.displayName==="Vincent Van Gogh";
        })]._id,
        reviews: {
          client: {
            stars: 5,
            text: "Vincent was a pleasure to work with."
          },
          artist: {
            stars: 5,
            text: "A bit crazy but I like that ;)"
          }
        }
      };
      var strawHut = {
        client: users[_.findIndex(users, function(user) {
          return user.displayName==="Beckylee Dell";
        })]._id,
        title: "A Straw Hut",
        description: "With colors and sunlight.",
        photos: ['https://markofthewolfe.files.wordpress.com/2015/03/monet_haystacks_lg.jpg'],
        tags: ["straw, houses", "painting"]
      };
      var flower = {
        client: users[_.findIndex(users, function(user) {
          return user.displayName==="Kathy Lu";
        })]._id,
        title: "Paint a Huge Up-Close Flower",
        description: "The flower is a metaphor. Women, there's nothing to be ashamed of.",
        photos: ['http://i01.i.aliimg.com/wsphoto/v0/763340093/Famous-Georgia-O-Keeffe-Bella-Donna-floral-leaves-oil-paintings-on-canvas-decorative-museum-fruits-replica.jpg'],
        tags: ["flowers", "feminism"]
      };
      var guitarrist = {
        client: users[_.findIndex(users, function(user) {
          return user.displayName==="Kathy Lu";
        })]._id,
        title: "An Blue Old Man Playing Guitar",
        description: "Life is full of sadness.",
        photos: ['http://www.pablopicasso.org/images/paintings/the-old-guitarist.jpg'],
        tags: ["blue", "guitarrist", "painting"]
      };
      var shark = {
        client: users[_.findIndex(users, function(user) {
          return user.displayName==="Austin Shoecraft";
        })]._id,
        title: "Kill a Shark and Put It in a Tank for My Bedroom",
        description: "Self-explanatory.",
        photos: ['https://upload.wikimedia.org/wikipedia/en/3/38/Hirst-Shark.jpg'],
        tags: ["life", "shark", "installation"]
      };
      var skull = {
        client: users[_.findIndex(users, function(user) {
          return user.displayName==="Austin Shoecraft";
        })]._id,
        title: "Put Diamonds on My Skull after I Die",
        description: "I want my skull to be covered in diamonds, and diamonds in the eye sockets too",
        photos: ['http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=14504524'],
        tags: "diamonds, skull, sculpture"
      };

      jobs = [sistineChapel, monaLisa, starryNight, strawHut, flower, guitarrist, shark, skull];
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
