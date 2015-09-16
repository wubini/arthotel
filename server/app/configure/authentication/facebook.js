'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL,
        profileURL: 'https://graph.facebook.com/me?fields=location,first_name,last_name,middle_name,name,picture'
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
      console.log("facebook profile", profile);
        UserModel.findOne({ 'facebook.id': profile.id }).exec()
        .then(function (user) {

            if (user) {
                return user;
            } else {
                return UserModel.create({
                    facebook: {
                        id: profile.id
                    },
                    displayName: profile.displayName,
                    photoUrl: [profile.photos[0].value]
                });
            }
        }).then(function (userToLogin) {
            done(null, userToLogin);
        }, function (err) {
            console.error('Error creating user from Facebook authentication', err);
            done(err);
        })
    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', function(req, res, next)
      {
        console.log('hitting /auth/facebook');
        next();
      },
      passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            console.log('here');
            res.redirect('/');
        });

};
