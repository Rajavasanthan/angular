app.config(function($routeProvider, $locationProvider, $httpProvider,FacebookProvider) {
    FacebookProvider.init('130763327018051');
    $httpProvider.defaults.cache = false;
    $locationProvider.html5Mode(true);
    $routeProvider
            .when('/', {
                templateUrl: 'app/views/homeLayout.html',
                controller: 'HomeController'
            })
            .otherwise({
                redirectTo: '#/'
            });
});