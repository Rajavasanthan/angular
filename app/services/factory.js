app.factory('getArticlesCL', ['$http', '$resource', '$routeParams', '$cacheFactory', function($http, $resource, $routeParams, $cacheFactory) {

        return $resource('http://www.vaigarai.com/api/public/map/:country/:category', {}, {
            query: {method: 'GET', params: {country: $routeParams.country, category: $routeParams.category}, isArray: false}
        });
    }]);


app.factory('getArticleSlug', ['$http', '$resource', '$routeParams', function($http, $resource, $routeParams) {
        return $resource('http://www.vaigarai.com/api/public/news/:slug', {}, {
            query: {method: 'GET', params: {slug: $routeParams.slug}, isArray: false}
        });
    }]);


/*
 * Used in SlugController
 */
app.factory('getRelatedArticles', ['$http', '$resource', '$routeParams', function($http, $resource, $routeParams) {
        return $resource('http://www.vaigarai.com/api/public/news/fetchRelatedArticles/:slug', {}, {
            query: {method: 'GET', params: {slug: $routeParams.slug}, isArray: false}
        });
    }]);

/*
 * Used in All Controllers
 */
app.factory('getSmallNav', ['$http', '$resource', '$routeParams', function($http, $resource, $routeParams) {
        return $resource('http://www.vaigarai.com/api/public/map/getSmallNav', {}, {
            query: {method: 'GET', isArray: true}
        });
    }]);

/*
 * Used in All Controllers
 */
app.factory('getCountry', ['$http', '$resource', '$routeParams', function($http, $resource, $routeParams) {
        return $resource('http://www.vaigarai.com/api/public/news/getCountry', {}, {
            query: {method: 'GET', isArray: true}
        });
    }]);

app.factory('meta', [function() {
        var title = "வைகறை";
        var tags = "vaigarai,inter net radio, online radio,index of change";
        var image = '';
        return {
            title: function() {
                return title;
            },
            tags: function() {
                return tags;
            },
            image: function() {

            },
            setTitle: function(newTitle) {
                title = newTitle;
            },
            setTags: function(newTags) {
                tags = newTags;
            },
            setImage: function(newImage) {
                image = newImage;
            }
        };
    }]);


app.run(function($rootScope, getSmallNav, $location, $window, getCountry, $templateCache) {
    var initializing = true;
    $rootScope.baseURL = 'http://www.vaigarai.com/api/public';
    $rootScope.category = 'entertainment';
    $rootScope.country = 'chennai';
    $rootScope.smallNav = getSmallNav.query();
    $rootScope.countries = getCountry.query();
    $rootScope.$watch('country', function() {
        if (initializing !== true) {
//            $window.location = '#/';
//            initializing = false;
            $window.location = '#/' + $rootScope.country + '/' + $rootScope.category;
        }

//        }
//        console.log($rootScope.category);
//        console.log($rootScope.country);

    });
    $rootScope.changeCountry = function(countryValue) {
        $rootScope.country = countryValue;
    };
    $rootScope.changeSamllNav = function(categoryValue) {
        $rootScope.category = categoryValue;
    };

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        $templateCache.removeAll();
    });
});

app.filter('dateToISO', function() {
  return function(input) {
    input = new Date(input).toISOString();
    return input;
  };
});