'use strict';

var cssApp = angular.module('cssApp');

cssApp.controller('appController', ['$scope', '$route', '$location', function ($scope, $route, $location) {

  // On route change, update current page
  $scope.$on('$routeChangeSuccess', function ($currentRoute, $previousRoute) {
    $scope.currentPage = $route.current.title;
  });

  // Set nav items
  $scope.navItems = [
    {
      'title': 'About',
      'url': '/about',
      'newtab': false
    },
    {
      'title': 'Events',
      'url': 'http://bit.ly/1ihz2k9',
      'newtab': true
    },
    {
      'title': 'Jobs',
      'url': '/jobs',
      'newtab': false
    },
    {
      'title': 'Wellbeing',
      'url': '/wellbeing',
      'newtab': false
    },
    {
      'title': 'Tutorials',
      'url': '/tutorials',
      'newtab': false
    },
    {
      'title': 'Blog',
      'url': '#',
      'newtab': false
    }
  ];
}]);
