const express = require('express');
const router = express.Router();
const withAuth = require('../middleware/custom-auth-middleware');

router.get('/', (req, res) => {
    res.render('home', { user: req.user })
});

router.get('/login', (req, res) => res.render('auth', { user: req.user }));

router.get('/register', (req, res) => res.render('auth', { user: req.user }));

router.get('/dashboard', withAuth, (req, res) => { 
    res.render('user-dashboard', { layout: 'dashboard', user: req.user.toJSON() });
});

module.exports = router;