/// <reference path="../_app.ts" />
var app;
(function (app) {
    'use strict';
    var AppStorage = (function () {
        function AppStorage() {
        }
        AppStorage.prototype.get = function (key) {
            return JSON.parse(localStorage.getItem(key) || '""');
        };
        AppStorage.prototype.set = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        };
        return AppStorage;
    })();
    app.AppStorage = AppStorage;
})(app || (app = {}));
/// <reference path="../_app.ts" />
var app;
(function (app) {
    'use strict';
    var AppCtrl = (function () {
        function AppCtrl($scope, appStorage) {
            this.$scope = $scope;
            this.appStorage = appStorage;
            $scope.greeting = appStorage.get('name') !== '' ? 'Hello ' + appStorage.get('name') + ' !' : 'Hello you !';
            $scope.changeName = function (name) {
                appStorage.set('name', name);
                $scope.greeting = 'Hello ' + name + ' !';
            };
        }
        AppCtrl.$inject = [
            '$scope',
            'appStorage'
        ];
        return AppCtrl;
    })();
    app.AppCtrl = AppCtrl;
})(app || (app = {}));
/// <reference path="../_app.ts" />
var app;
(function (app) {
    'use strict';
    function changeName() {
        return {
            restrict: 'A',
            scope: false,
            link: function ($scope, element, attributes) {
                element.on('mouseenter', function () {
                    element.addClass('animate');
                })
                    .on('mouseleave', function () {
                    element.removeClass('animate');
                })
                    .on('click', function () {
                    var name = JSON.parse(JSON.stringify(prompt('Please enter your name:'))); // encode input to avoid escaping character
                    $scope.changeName(name);
                    $scope.$digest();
                });
            }
        };
    }
    app.changeName = changeName;
    ;
})(app || (app = {}));
/// <reference path="../_app.ts" />
var app;
(function (app) {
    'use strict';
    angular.module('app', ['ngRoute'])
        .service('appStorage', app.AppStorage)
        .controller('appCtrl', app.AppCtrl)
        .directive('changeName', app.changeName)
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: './partials/app.html',
                controller: 'appCtrl'
            })
                .otherwise({
                redirectTo: '/'
            });
        }]);
})(app || (app = {}));
/// <reference path="../lib/definitelytyped/jquery/jquery.d.ts" />
/// <reference path="../lib/definitelytyped/angular/angular.d.ts" />
/// <reference path="./services/AppStorage.ts" />
/// <reference path='./controllers/AppCtrl.ts' />
/// <reference path="./directives/changeName.ts" />
/// <reference path="./modules/app.ts" />
