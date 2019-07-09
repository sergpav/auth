var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


passport.use('local-signup', new LocalStrategy(
    {
        passReqToCallback: true
    },
    function(req ,username, password, done) {
        User.findOne({$or: [
            {'username': username},
            {'email': req.body.email}
        ]}, (err, user) => {
            if (err) { 
                return done(err); 
            }
            if (user) {
                if (user.email == req.body.email && user.username == username)
                {
                    return done(null, false, {'message': 'email and username already taken'});
                }
                if (user.email == req.body.email) {
                    return done(null, false, {'message': 'email is already taken'});
                }
                if (user.username == username) {
                    return done(null, false, {'message': 'username is already taken'});
                }
            }
            else {
                let person = new User();
                person.username = username;
                person.email = req.body.email;
                person.password = password;
                person.save( (err) => {
                    if (err) {
                        throw err;
                    }
                    return done(null, person);
                });
            }
        });
    }
));