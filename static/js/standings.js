(function(){

    var app = angular.module('standings', []);

    app.directive('standingsTable', function() {
        return {
            restrict: 'E',
            templateUrl: '/static/templates/standings-table.html',
            controller: ['$http', function($http) {
                var _that = this;
                this.ratings = [];

                $http
                    .get('/api/standings.json')
                    .success(function(data) {
                        _that.ratings = data;
                    });
            }],
            controllerAs: 'standingsCtrl'
        };
    });

    app.directive('teamInfo', function() {
        return {
            restrict: 'E',
            templateUrl: '/static/templates/team-info.html',
            controller: ['$routeParams', '$http', function($routeParams, $http) {
                var _that = this;
                var teamId = $routeParams.teamId;
                this.team = {};

                $http
                    .get('/api/team/' + teamId + '.json')
                    .success(function(data) {
                        _that.team = data[0];
                    });
            }],
            controllerAs: 'teamCtrl'
        };
    });

})();
