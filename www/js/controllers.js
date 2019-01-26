angular.module('starter.controllers', [])

.controller('AuthCtrl', function($scope, $ionicConfig) {

})

//LOGIN
.controller('LoginCtrl', function($scope, $state, $templateCache, $q, $rootScope) {
  Parse.initialize("fyqmax4vrwbtWzGtaVx2LFfqpBIfQLoIMmXCfseP", "t0A6APpX6jm6YFHEXq5vrQrZxeftmZBw5AufNvdt");
  console.log("initialize");
  $scope.user = {};
  $scope.doLogIn = function() {
    Parse.User.logIn($scope.user.username, $scope.user.password, {
      success: function(user) {
        $state.go('app.feeds-categories');
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        console.log("log in error");
      }
    });
  }
})

//signup
.controller('SignupCtrl', function($scope, $state, $ionicPopup) {
  
  Parse.initialize("fyqmax4vrwbtWzGtaVx2LFfqpBIfQLoIMmXCfseP", "t0A6APpX6jm6YFHEXq5vrQrZxeftmZBw5AufNvdt");
  console.log("initialize");
  $scope.user = {};
  $scope.doSignUp = function() {

    if ($scope.user.password == $scope.user.confirmPassword) 
    {
      var user = new Parse.User();

      user.set("username", $scope.user.name);
      user.set("password", $scope.user.password);
      user.set("email", $scope.user.email);

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          console.log("signup successfully!");
          $state.go('auth.login');
        },
        error: function(user, error) {
          console.log("signUp error!");
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
    else
    {
      var alertPopup = $ionicPopup.alert({
       title: 'Password not match!',
       template: 'Password not match!!!'
       });

       alertPopup.then(function(res) {
       console.log('not match');
       });
    }
  }
})

.controller('ForgotPasswordCtrl', function($scope, $state) {
  $scope.recoverPassword = function(){
    $state.go('app.feeds-categories');
  };

  $scope.user = {};
})

//maps
.controller('MapCtrl', function($scope, $ionicLoading) {


   $scope.posts = [
            { id: 1, name: 'Oslo', pos: [34, -81.1] },
            { id: 2, name: 'Stockholm', pos: [34, -81.2] },
            { id: 3, name: 'Copenhagen', pos: [34, -81.3] },
            { id: 4, name: 'Berlin', pos: [34, -81.4] },
            { id: 5, name: 'Paris', pos: [34, -81.5] }
        ];
$scope.showPost = function(event, post) {
            $scope.selectedpost = post;
            $scope.map.showInfoWindow('myInfoWindow', this);
        };


  $scope.info_position = {
    lat: 43.07493,
    lng: -89.381388
  };

  $scope.center_position = {
    lat: 43.07493,
    lng: -89.381388
  };

  $scope.my_location = "";

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  $scope.centerOnMe= function(){

    $scope.positions = [];

    $ionicLoading.show({
      template: 'Loading...'
    });

    // with this function you can get the user’s current position
    // we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.current_position = {lat: pos.G,lng: pos.K};
      $scope.my_location = pos.G+", "+pos.K;
      $scope.map.setCenter(pos);
      $ionicLoading.hide();
    });
  };
})

.controller('MapviewCtrl', function($scope, $ionicPopup, $ionicLoading) {


Parse.initialize("fyqmax4vrwbtWzGtaVx2LFfqpBIfQLoIMmXCfseP", "t0A6APpX6jm6YFHEXq5vrQrZxeftmZBw5AufNvdt");
  console.log("mapview initialize");
 

$scope.posts = [];



var getposts = Parse.Object.extend("Post");
var query = new Parse.Query(getposts);
query.equalTo("city", "columbia");
query.find({
  success: function(results) {
    alert("Successfully retrieved " + results.length + " scores.");


  
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) {
        console.log(i);
        console.log(results[i].get("title"));
        console.log(results[i].get("city"));
        console.log(results[i].get("location"));
        console.log(results[i].get("category"));
        console.log("");
        
      $scope.posts.push({

        order:i,
        title:results[i].get("title"),
        price: results[i].get("price"),
        description:results[i].get("description"),
        pictures:(results[i].get("pictures")),
        state: results[i].get("state"),
        city:results[i].get("city"),
        pos:results[i].get("location"),
        category:results[i].get("category")

      })

      //alert(object.id + ' - ' + object.get('city'));
    }
  },
  error: function(error) {
   // alert("Error: " + error.code + " " + error.message);
  }
});






  $scope.$on('mapInitialized', function (event, map) {
            $scope.map = map;
         });

   $scope.showpost= function (event,post) {
         var name1=post.title;
         var order=post.order;
         var price1=post.price;




  var myPopup = $ionicPopup.show({
    
    title: name1,
    subTitle: "$"+price1,
    template: '<div style="background-image: url(http://uscaed.com/wp-content/uploads/2013/06/Gamecock.jpg);background-size: 100px 100px; background-repeat: no-repeat; height: 100px; width: 100px; border: 1px solid black;");"><p></p><br><img style=" border-radius: 10px;" src="http://lorempixel.com/50/50/food/?v=1"></img><img style=" border-radius: 10px;" src="http://lorempixel.com/50/50/food/?v=1"></img></div>',
    //subTitle: 'Please use normal things',
    scope: $scope,

    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Details</b>',
        type: 'button-positive',
        onTap: function(e) {
          alert("link to the post detail page");
          
        }
      }
    ]
  });


         };



  $scope.info_position = {
    lat: 34.07493,
    lng: -81.381388
  };

  $scope.center_position = {
    lat: 34.07493,
    lng: -81.381388
  };

  $scope.my_location = "";



  $scope.searchMap=function(){
    //alert("searching");
var addressField = document.getElementById('searchInput');

var geocoder = new google.maps.Geocoder();

$scope.searchlocation={};

    geocoder.geocode(
        {'address': addressField.value}, 
        function(results, status) { 
            if (status == google.maps.GeocoderStatus.OK) { 
                var loc = results[0].geometry.location;
                var searchlat=loc.lat();
                var searchlng=loc.lng();
                // use loc.lat(), loc.lng()
               searchlocation={lat: loc.lat(),lng:loc.lng()};
                console.log(searchlocation);
                $scope.map.setCenter(searchlocation);


            } 
            else {
                alert("Not found: " + status); 
            } 
        }
    );



  };

  $scope.centerOnMe= function(){

    $scope.positions = [];

    // $ionicLoading.show({
    //  template: 'Searching Nearby Posts...'
    // });

    // with this function you can get the user’s current position
    // we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.current_position = {lat: pos.G,lng: pos.K};
      $scope.my_location = pos.G+", "+pos.K;
      $scope.map.setCenter(pos);
      $ionicLoading.hide();
    });
  };
})

// FEED
//brings all feed categories
.controller('FeedsCategoriesCtrl', function($scope, $http) {
  $scope.feeds_categories = [];

  $http.get('feeds-categories.json').success(function(response) {
    $scope.feeds_categories = response;
  });
})

.controller('NewPostCtrl', function($scope, $rootScope, $cordovaCamera,$ionicViewService,$state,$cordovaGeolocation,$http) {
  Parse.initialize("fyqmax4vrwbtWzGtaVx2LFfqpBIfQLoIMmXCfseP", "t0A6APpX6jm6YFHEXq5vrQrZxeftmZBw5AufNvdt");

  $scope.ready = false;
  $scope.images = [];
  $scope.pics = [];

  $rootScope.$watch('appReady.status', function() {
    console.log('watch fired '+$rootScope.appReady.status);
    if($rootScope.appReady.status) $scope.ready = true;
  });

  $scope.selImages = function() {
      var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };


        $cordovaCamera.getPicture(options).then(function(imageData) {

            //$scope.imageData = imageData;
            var uridata = "data:image/jpeg;base64," + imageData;
            $scope.pics.push(imageData);
            $scope.images.push(uridata);
        },
            function(err){
               // An error occured. Shw a message to the user.
        });
  };

  $scope.removeImage = function(image) {
    $scope.images = _.without($scope.images, image);
  };

    $scope.getMyLocation = function(){
        var posOptions = {timeout: 20000, enableHighAccuracy: false};
         $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            $scope.lat = lat;
            console.log($scope.lat);
            var long = position.coords.longitude;
            $scope.long = long;
            console.log($scope.long);
            var requestURL = 'https://search.mapzen.com/v1/reverse?api_key=search-3TV73br&point.lat='+lat + '&point.lon=' + long;
            $http.get(requestURL).success(function(response) {
              console.log(response);
              var county= response.features[0].properties.locality;
              var stat= response.features[0].properties.region;
              if (county == null || stat == null)
              {
                alert("Can't get your location!");
              }
              else
              {
                $scope.city  = county;
                $scope.state = stat;
              }
            });
            //console.log(lat + '   ' + long)
         }, function(err) {
            console.log(err);
         });
    }

    $scope.formData = {};

    $scope.confirm = function() {
    var currentUser = Parse.User.current();
    if (currentUser) {
      var post = new Parse.Object("Post");

      post.set("user", currentUser);
      post.set("title", $scope.formData.title);
      post.set("category", $scope.formData.category);
      post.set("description", $scope.formData.description);
      post.set("price", $scope.formData.price);
      var array = [];

      for (var i=0; i<$scope.pics.length; i++)
      {
          var fileName = "pic.jpeg";
          var base64Img = "data:image/jpeg;base64," + $scope.pics[i];
          var parseFile = new Parse.File(fileName,{base64:base64Img});
          array.push(parseFile);
      }
      post.set("pictures", array);
      post.set("city", $scope.city);
      post.set("state", $scope.state);
      var point = new Parse.GeoPoint({latitude: $scope.lat, longitude: $scope.long});
      post.set("location", point);
      post.save(null, {
        success: function(gameScore) {
          // Execute any logic that should take place after the object is saved.
          //alert('New object created with objectId: ' + post.id);
          $ionicViewService.nextViewOptions({
            disableBack: true
        });
          $state.go('app.feeds-categories');
        },
        error: function(gameScore, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          console.log('Failed to create new object, with error code: ' + error.message);
        }
      });
    } else {
        // show the signup or login page
        $state.go('auth.walkthrough');
    }
    };
    
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('FeedEntriesCtrl', function($scope, $stateParams) {
  
  Parse.initialize("fyqmax4vrwbtWzGtaVx2LFfqpBIfQLoIMmXCfseP", "t0A6APpX6jm6YFHEXq5vrQrZxeftmZBw5AufNvdt");
  //var categoryId = $stateParams.categoryId,
    var sourceId = $stateParams.sourceId;
    console.log("sourceId: " + sourceId);
    var Post = Parse.Object.extend("Post");
    var query = new Parse.Query(Post);
    var imglist = [];
    $scope.images = [];
    query.get(sourceId, {
      success: function(object) {
        // The object was retrieved successfully.
        console.log("successfully!");
        $scope.sourceTitle  = object.get("title");
        $scope.description = object.get("description");
        $scope.price = object.get("price");
        $scope.createtime = object.get("createdAt");
        //images
        if (object.get("pictures") != null)
        {
          imglist = object.get("pictures");
          $scope.img = imglist[0].url();
        }
        else
        {
          $scope.img = "img/ionic.png";
        }
        for (var i=0; i<imglist.length; i++)
        {
          $scope.images.push(imglist[i].url());
        }
        $scope.$apply();
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        console.log("error!");
      }
    });
})

.controller('CategoryFeedsCtrl', function($scope, $http, $stateParams, $state) {
      Parse.initialize("fyqmax4vrwbtWzGtaVx2LFfqpBIfQLoIMmXCfseP", "t0A6APpX6jm6YFHEXq5vrQrZxeftmZBw5AufNvdt");
      $scope.category_sources = [];
      $scope.retrievedData = [];
      $scope.categoryId = $stateParams.categoryId;
      console.log(".."+$scope.categoryId);
      $http.get('feeds-categories.json').success(function(response) {
        console.log(response);
        console.log("categoryId:" + $scope.categoryId);
        var category = _.find(response, {title: $scope.categoryId});
        console.log(category);
        var queryEntry =category.title;
        console.log(category);
        var GameScore = Parse.Object.extend("Post");
        var query = new Parse.Query(GameScore);
        
        query.equalTo("category", queryEntry);
        // var arrayOfPic = [];
        // query.containedIn("pictures", arrayOfPic);
        // console.log("arrayOfPic"+arrayOfPic);

        query.find({
          success: function(results) {
            //alert("Successfully retrieved " + results.length + " scores.");
            console.log(results);
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
                var imgs = results[i].get("pictures");
                var imgsrc;
                if (imgs != null)
                {
                  imgsrc = imgs[0].url();
                }
                else
                {
                  imgsrc = "img/ionic.png";
                }
               $scope.retrievedData.push({
                  title:results[i].get("title"),
                  price: results[i].get("price"),
                  description:results[i].get("description"),
                  state: results[i].get("state"),
                  city:results[i].get("city"),
                  pos:results[i].get("location"),
                  category:results[i].get("category"),
                  objectId:results[i].id,
                  image:imgsrc
                });
            }
            $scope.$apply();
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
        $scope.categoryTitle = category.title;
        //$scope.category_sources = category.feed_sources;
      });
      $scope.add=function () {
          console.log("save to new page ");
          $state.go('app.newpost');
      }
});
