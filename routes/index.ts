import express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home' });
});
/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Us', page: 'about' });
});
/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Our Projects', page: 'projects' });
});
/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Our Services', page: 'services' });
});
/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us', page: 'contact' });
});
/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', page: 'login' });
});
/* GET login page. */
router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register', page: 'register' });
});

module.exports = router;
