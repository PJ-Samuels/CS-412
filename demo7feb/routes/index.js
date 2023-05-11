//routes are where express goes when needed to match to the right function

var express = require('express');
var router = express.Router();

/* GET home page. */

//get function, url '/' , calls another function
//function call = router.get('/'
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profiles',function (req, res, next) {
  res.send('some profiles')
  // res.send('some other profiles i forgot the first time')//throws error
})
//req = request object
//res = response object
module.exports = router;
