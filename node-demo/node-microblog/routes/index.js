const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.render('index',{title:'index'});
});

const users = {
    'mary':{
        userName:'Mary'
    }
};

router.all('/user/:username', (req,res,next) => {
    if(users[req.params.username]){
        next();
    }else{
        next(new Error(req.params.username + ' does not exist!'));
    }
});

router.get('/user/:username', (req,res) => {
    res.render('user',{
        title:req.params.username + '- Profile',
        user:req.params.username
    });
});

router.put('/user/:username', (req,res) => {
    res.send('Done');
});

router.get('*', (req,res,next) => {
    res.status(404).render('404',{title:404});
});

module.exports = router;