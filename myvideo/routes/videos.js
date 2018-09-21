//服务器

var express = require('express');
var router = express.Router();

var monk = require('monk');

//var db = monk('localhost:27017/vidzy');

var db = monk('localhost:27017/myVideoDB');

//处理get请求,本案例中与vidzy.js控制器中的query方法对应
router.get('/', function(req, res) 
{
    //从数据库中读取数据并返回给控制器
    var collection = db.get('videos');
    collection.find({}, function(err, videos)
    {
        if (err) throw err;
        res.json(videos);
    });
});


// 增加一件商品
//处理post请求，本案例中与vidzy.js控制器中的save方法对应
router.post('/', function(req, res)
{
   
    console.log ( req.body );

    //将控制器post请求中的数据插入数据库中，并返回插入后的数据
    var collection = db.get('videos');
    collection.insert(
    {
        title: req.body.title,
        description: req.body.description
    }, function(err, video)
    {
        if (err) throw err;
        res.json(video);
    });
});





module.exports = router;
