const express = require('express');
const router = express.router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/', (req, res, next) => {
    if(req.body.password !== req.body.passwordConf){
        let err = new Error('password tidak cocok!');
        err.status = 400;
        res.send('password tidak cocok!');
        next(err);
    }

    if(
        req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf
    ) {
        let userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        };
        user.create(userData, (eror, user) => {
            if(error){
                next(error);
            }else{
                req.session.userId = user._id;
                res.redirect('/profil');
            }
        });
    }else if(req.body.logemail && req.body.logpassword){
        user.authenticate(
            req.body.logemail,
            req.body.logpassword,
            (error, user) => {
                if(error || !user){
                    let err = new Error('email/password anda salah!');
                    err.status = 401;
                    next(err);
                }else{
                    req.session.userId = user._id;
                    res.redirect('/profil');
                }
            }
        );
    }else{
        let err = new Error('mohon mengisi input');
        err.status = 400;
        next(err);
    }
});

router.get('/profil', (req, res, next) => {
    user.findById(req.session.userId).exec((error, user) => {
        if(error){
            next(error);
        }else{
            if(user == null){
                setTimeout(function(){
                    let err = new Error('silahkan login dahulu!');
                    err.status = 400;
                    next(err);
                }, 1000);
            }else{
                res.render('home', {
                    namaUser: user
                });
            }
        }
    });
});

router.get('/logout', (req, res, next) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                next(err);
            }else{
                res.redirect('/');
            }
        });
    }
});

module.exports = router;