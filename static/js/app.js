(function() {

    var app = angular.module('race', ['ngRoute', 'standings']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/static/pages/index.html'
            })
            .when('/team/:teamId', {
                templateUrl: '/static/pages/team.html'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);

})();
