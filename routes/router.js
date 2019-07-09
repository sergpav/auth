const   express = require('express'),
        router = express.Router(),
        passport = require('passport'),
        isAuth = require('../app/authentication/middleware');

router.get('/', (req, res) => {
    res.render('index', {auth: req.isAuthenticated()});
});

router.get('/login', (req, res) => {
    res.render('login', {message: req.flash('error'), auth: req.isAuthenticated()});
})

router.post('/signin', passport.authenticate('local-login', {failureRedirect : '/login', failureFlash: true}), (req, res) => {
    res.redirect('/profile');
});

router.get('/register', (req, res) => {
    res.render('register', {message: req.flash('error'),auth: req.isAuthenticated()});    
});

router.post('/signup', passport.authenticate('local-signup', {failureRedirect : '/register', failureFlash: true}), (req, res) => {
    res.redirect('/profile');
});

router.get('/profile', isAuth, (req, res) => {
    res.render('profile', {auth: req.isAuthenticated()});
});

router.get('/logout', isAuth, (req, res) => {
    req.logout();
    res.redirect('/');
});



module.exports = router;