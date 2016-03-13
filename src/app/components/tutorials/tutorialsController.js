'use strict';

var cssApp = angular.module('cssApp');

cssApp.controller('tutorialsController', ['$scope', 'yamlService', function ($scope, yamlService) {

  yamlService.fetch('tutorials').then(function (data) {
    this.tutorialList = data;
  }.bind(this));

}]);
