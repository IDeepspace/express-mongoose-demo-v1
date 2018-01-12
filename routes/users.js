var express = require('express');
var router = express.Router();

var userModel = require('../models/userModel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.redirect('/users/list');
});

//查询所有
router.get('/list', function(req, res, next) {
  userModel.find(function(err, data){
    if(err){
      return console.log(err);
    }
    res.render('UserList',{
      user: data
    });
  });
});

// 新增
router.get('/add', function(req, res, next) {
  res.render('UserAdd');
});

router.post('/add', function(req, res, next) {
  var newUser = new userModel({
    username: req.body.username,
    email: req.body.email
  })
  newUser.save(function(err, data){
    if(err){ return console.log(err) }
    res.redirect('/users/list');
  })
});


// 修改
router.get('/edit/:id', function (req, res, next) {
  var id = req.params.id;
  userModel.findOne({_id: id}, function (err, data) {
    res.render('UserEdit', {
      user: data
    })
  })
});

router.post('/update', function (req, res, next) {
  var id = req.body.id;
  userModel.findById(id, function (err, data) {
    if(err){ return console.log(err); }
    data.username = req.body.username;
    data.email = req.body.email;
    data.save(function(err){
      res.redirect('/users/list');
    })
  })
});


//删除
router.delete('/del', function (req, res) {
  var id = req.query.id;
  userModel.remove({ _id: id }, function (err, data) {
    if (err) { return console.log(err); }
    res.json({ code: 200, msg: '删除成功' });
  })
})

module.exports = router;
