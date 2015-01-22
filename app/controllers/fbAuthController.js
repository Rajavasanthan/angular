app.controller('fbAuthController', function($scope, Facebook) {

    $scope.login = function() {
        // From now on you can use the Facebook service just as Facebook api says
        Facebook.login(function(response) {
            console.log('Loged In');
        });
    };

    $scope.getLoginStatus = function() {
        Facebook.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                $scope.loggedIn = true;
            } else {
                $scope.loggedIn = false;
            }
        });
    };

    $scope.me = function() {
        Facebook.api('/me', function(response) {
            $scope.user = response;
        });
    };
});