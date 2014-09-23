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

})();
