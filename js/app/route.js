angular.module('myApp', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider.when('/', {
      templateUrl : 'view/pmc_search.html',
      controller: 'FormPMCController'
    });
    
    $routeProvider.when('/pubmed', {
      templateUrl : 'view/pmc_search.html',
      controller: 'FormPubmedController'
    });

    $routeProvider.when('/PMC/:id', {
      templateUrl: 'view/pmc_id_full.html',
      controller: 'PmcIdController'
    });
    
    $routeProvider.when('/pubmed/:id', {
      templateUrl: 'view/pmc_id_full.html',
      controller: 'PubMedIdController'
    });
  }])
  .config(['$compileProvider', function ($compileProvider) {
    'use strict';
    
    $compileProvider.debugInfoEnabled(false);
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
  }]);