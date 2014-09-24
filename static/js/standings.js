(function(){

    var app = angular.module('standings', []);

    app.directive('standingsTable', function() {
        return {
            restrict: 'E',
            templateUrl: '/static/templates/standings-table.html',
            controller: 'StandingsController',
            controllerAs: 'standingsCtrl'
        };
    });

    app.directive('teamInfo', function() {
        return {
            restrict: 'E',
            templateUrl: '/static/templates/team-info.html',
            controller: 'TeamController',
            controllerAs: 'teamCtrl'
        };
    });

    app.controller("StandingsController", ['$scope', '$filter', '$http', '$interval', function($scope, $filter, $http, $interval) {
        var _that = this;

        this.ratings = [];

        var orderBy = $filter('orderBy');

        this.order = function(predicate, reverse) {
            _that.ratings = orderBy(_that.ratings, predicate, reverse);
        };

        this.getData = function() {
            $http
                .get('/api/standings.json?rnd=' + Math.random())
                .success(function(data) {
                    _that.ratings = data;
                    _that.order('points', true);
                });
        };

        var intervalPromise = $interval(this.getData, 2000);
        $scope.$on('$destroy', function() {
            $interval.cancel(intervalPromise);
        });

        this.getData();
    }]);

    app.controller('TeamController', ['$routeParams', '$http', function($routeParams, $http) {
        var _that = this;
        var teamId = $routeParams.teamId;
        this.team = {};

        $http
            .get('/api/team/' + teamId + '.json')
            .success(function(data) {
                _that.team = data[0];
            });
    }]);

})();
