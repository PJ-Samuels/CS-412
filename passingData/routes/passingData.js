const express = require('express');
const router = express.Router();


///what is the URL
///http://localhost:3000/passing/one
router.get("/one",(req, res, next) =>
{
    let foo;
    res.json({name:req.query.name, age: req.query.age})
})
module.exports = router;

router.get("/two/:name/:age",(req, res, next) => {
    let foo;
    res.json({name:req.params.name, age: req.params.age})
})