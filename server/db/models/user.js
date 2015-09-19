'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Posting = mongoose.model('Posting');
var _ = require('lodash');

var schema = new mongoose.Schema({
    displayName: String,
    email: {
        type: String
    },
    bio: {
      type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    phone: {
      home: String,
      work: String,
      mobile: String
    },
    photoUrl: String,
    portfolioUrl: String
});

schema.virtual('artistRating').get(function()
{
  return Posting.find({artist: this._id, status:'complete'})
  .then(function(postings)
  {
    if(postings.length)
    {
      var totalRating = 0;
      postings.forEach(function(posting)
      {
        var index = _.findIndex(posting.reviews, function(rev)
        {
          return rev.type==='client';
        });
        totalRating += posting.reviews[index].stars;
      })
      return totalRating/postings.length();
    }
    else
    {
      return undefined;
    }
  })
});

schema.virtual('clientRating').get(function()
{
  return Posting.find({client: this._id, status:'complete'})
  .then(function(postings)
  {
    if(postings.length)
    {
      var totalRating = 0;
      postings.forEach(function(posting)
      {
        var index = _.findIndex(posting.reviews, function(rev)
        {
          return rev.type==='artist';
        });
        totalRating += posting.reviews[index].stars;
      })
      return totalRating/postings.length();
    }
    else
    {
      return undefined;
    }
  })
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
