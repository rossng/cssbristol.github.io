'use strict';

/* Config & routing */

var cssApp = angular.module('cssApp', ['ngRoute', 'ngAnimate']);

cssApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/app/components/main/mainView.html',
      controller: 'mainController',
      controllerAs: 'main',
      title: ''
    })
    .when('/about', {
      templateUrl: '/app/components/about/aboutView.html',
      title: 'About Us'
    })
    .when('/wellbeing', {
      templateUrl: '/app/components/wellbeing/wellbeingView.html',
      title: 'Wellbeing'
    })
    .when('/tutorials', {
      templateUrl: '/app/components/tutorials/tutorialsView.html',
      title: 'Tutorials',
      controller: 'tutorialsController',
      controllerAs: 'tutorials'
    })
    .when('/jobs', {
      templateUrl: '/app/components/jobs/jobView.html',
      title: 'Job Openings',
      controller: 'jobController',
      controllerAs: 'jobs'
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}]);
