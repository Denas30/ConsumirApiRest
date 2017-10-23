(function(){
 var app = angular.module('starter', ['ionic'])

      app.controller('RedditCtrol', function($scope, $http){
           $scope.posts =[];
           $http.get('https://www.reddit.com/r/gaming/new/.json')
           .success(function(posts){
            angular.forEach(posts.data.children, function(post){
            $scope.posts.push(post.data);
            });         
           });

           $scope.cargarNuevosPosts = function(){
            var params2 = {};
            if ($scope.posts.length > 0) {
                params2['after'] = $scope.posts[$scope.posts.length -1].name;
            }
           $http.get('https://www.reddit.com/r/gaming/new/.json',{params:params2})
           .success(function(posts){
            angular.forEach(posts.data.children, function(post){
            $scope.posts.push(post.data);
               });  
               $scope.$broadcast('scroll.infiniteScrollComplete');       
           });
   
           };
           $scope.doRefresh = function(){
             if ($scope.posts.length > 0) {
                 var params2 = {'before':$scope.posts[0].name};
           }else{
            return;
           }
            if ($scope.posts.length > 0) {
                params2['after'] = $scope.posts[$scope.posts.length -1].name;
            }
           $http.get('https://www.reddit.com/r/gaming/new/.json',{params:params2})
           .success(function(posts){
            var newPosts = [];
            angular.forEach(posts.data.children, function(post){
            $scope.posts.push(post.data);
               });  
               $scope.posts = newPosts.concat($scope.posts);
               $scope.$broadcast('scroll.refreshComplete');       
           });
           };
        $scope.openLink = function(url){
          window.open(url, '_blank');
        }

      });

      app.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
          if(window.cordova && window.cordova.plugins.Keyboard) {
             cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
             cordova.plugins.Keyboard.disableScroll(true);
          }
           if (window.cordova && window.cordova.InAppBrowser) {
                window.open = window.cordova.InAppBrowser.open;
           }
           if(window.StatusBar) {
            StatusBar.styleDefault();
          }
        });
       })
       }());
