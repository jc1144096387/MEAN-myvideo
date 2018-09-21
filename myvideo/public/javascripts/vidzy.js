//控制器
// 此处直接调用全局变量angular来创建Vidzy模块,并添加了两个依赖模块
//ngResource模块提供了'$resource'模块,$resource模块是基于$http的一个封装
//ngRoute是路由模块,提供了$routeProvider模块用于设置路由
var app = angular.module('Vidzy', ['ngResource','ngRoute']);

//设置路由
app.config(['$routeProvider', function($routeProvider)
{
    $routeProvider
    //此处意为访问首页即http://localhost:3000/ 时会用home.html中的内容来替换index.ejs中设置了ng-view的div元素，
    //并且调用名为'HomeCtrl'的控制器，将在下面的代码编写控制器
    .when('/', 
    {
        templateUrl: 'partials/home.html',
        controller:  'HomeCtrl'
    })

    .when('/add-video', {
        templateUrl: 'partials/video-form.html',
        controller:  'AddVideoCtrl'
    })
    //此处意为没有匹配的路由时，将会默认跳转到'/'路径
    .otherwise({
        redirectTo: '/'
    });
}]);

//创建HomeCtrl控制器
app.controller('HomeCtrl', ['$scope','$resource',function ($scope, $resource) {

     var Videos = $resource('/api/videos');//此处可以将Videos对象理解为vidzy.js控制器与videos.js服务器交互的接口
     //query方法属于GET类型请求
     Videos.query(function(videos)
     {
        //将videos.js服务器返回的videos对象数组赋值给$scope.videos，这样home.html中的列表便能依次显示这个对象数组中的每一个对象了
        $scope.videos = videos;
     });
 }]
);

//创建AddVideoCtrl控制器
app.controller('AddVideoCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location)
{
    //创建$scope.save方法，与video-form.html中按钮ng-click="save()"的save方法对应
    $scope.save = function()
    {
        var Videos = $resource('/api/videos');
        //$resource的save方法属于POST类型，此处将video-form.html中表单里填写的内容POST给服务器
        Videos.save($scope.video, function()
        {
            
            //post成功后，调用回调函数，跳转到首页
            $location.path('/');
        });
    };
}]);