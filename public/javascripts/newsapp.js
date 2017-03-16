var app = angular.module('NewsApp', []);

app.factory('sourceFetcher', sourceFetcher);
function sourceFetcher ($http) {
  var API_ROOT = 'sources';
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data;
        })
    }
  }
}

app.factory('favoritesFetcher', favoritesFetcher);
function favoritesFetcher ($http) {
  var API_ROOT = 'favorites';
  return {
    get: function () {
      return $http
        .get(API_ROOT)
	.then(function (resp) { 
	  return resp.data;
	})
    }
  }
}

app.controller('NewsCtrl', function ($scope, $http, sourceFetcher, favoritesFetcher) {

    $scope.sources = [];
    $scope.topStories = [];    

    // GET SOURCES FROM SERVER
    sourceFetcher.get()
      .then(function (data) {
        $scope.sources = data;
        getTopStories();
      });

    $scope.key = '7250848b7b8c4776be033ea1bede9000';

    function getTopStories() {
        $scope.sources.forEach(function (element) {
            if (element.sourceName != 'my-favs') {
                var url = 'https://newsapi.org/v1/articles?source=' + element.sourceName + '&sortBy=top&apiKey=' + $scope.key;
                $http.get(url)
                    .then(function (response) {
                        element.topStories = response.data.articles;
                    });
            } else {
		favoritesFetcher.get()
		  .then(function (data) {
		    $scope.favorites = data;
		  });
	    }
        });
    }

    $scope.activeSource = '';

    $scope.selectSource = function (source) {
        if ($scope.activeSource != source) {
            if (source.sourceName != 'my-favs') {
                $scope.topStories = source.topStories;
            } else {
                $scope.topStories = $scope.favorites;
            }
            $scope.activeSource = source;
        } else {
            $scope.topStories = [];
            $scope.activeSource = '';
        }
    }

    $scope.favorites = [];

    $scope.addToFavorites = function (index) { 
        var article = $scope.topStories[index];
        var favURL = '/favorites';
   	
	$http({
	  url: favURL,
 	  method: 'POST',
   	  data: article
	}).success(function(data, status, headers, config) {
	    favoritesFetcher.get()
	      .then(function (data) {
	          $scope.favorites = data;
		});
	}).error(function(data, status, headers, config) {
	    console.log("Post to favorites failed");
	});
    };

    function getFavoriteIdx (title) {
	for (var i = 0; i < $scope.favorites.length; i++) {
            var a = $scope.favorites[i];
            if (a.title == title) {
                return i;
            }
        }
        return null;
    }

    $scope.removeFromFavorites = function (title) {
	var articleIdx = getFavoriteIdx(title);
	if (articleIdx != null) {
	    $http({
	        url: '/favorites?idx=' + articleIdx,
		method: 'DELETE'
  	    }).success(function(data, status, headers, config){ 
		favoritesFetcher.get()
              	  .then(function (data) {
                    $scope.favorites = data;
		    if ($scope.activeSource.sourceName == 'my-favs') {
		    	$scope.topStories = $scope.favorites;
		    }
                  });
	    }).error(function(data, status, headers, config){ 
	   	console.log("Delete to favorites failed");
	    });
	}	
    }

    $scope.isFavorite = function(title) {
        for (var i = 0; i < $scope.favorites.length; i++) {
            var a = $scope.favorites[i];
            if (a.title == title) {
                return true;
            }
        }
        return false;
    }

    $scope.goTo = function (url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
});

app.directive('backImg', function () {
    return function (scope, element, attrs) {
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url + ')',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center'
        });
    };
});

app.directive('backColor', function () {
    return function (scope, element, attrs) {
        var colors = attrs.backColor.split(" ");
        element.css({
            'background-color': colors[0],
            'color': colors[1]
        })
    }
})
