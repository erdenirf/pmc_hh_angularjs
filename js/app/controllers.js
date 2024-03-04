import ModelPMC from "./ModelPMC.js";
import ModelPubMed from "./ModelPubMed.js";

function getNumberOr0(str) {
  if (Number(str) !== NaN) {
    return Number(str);
  }
  return 0;
};

angular.module('myApp')
  .controller('FormPMCController', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    
    $scope.Title = "Локальный поиск PMC";
    $scope.TemplateURL = 'view/link_pmc.html'
    
    $scope.search = {
      quartile: '',
      text: '',
      country: ''
    };
    
    $http.get('js/app/countries.json').then(function (response) {
      $scope.countries = response.data;
    });
    
    $scope.save = function (answer, answerForm) {
      if (answerForm.$valid) {
        var conf = {
          params: {
            filter_quartile: getNumberOr0($scope.search.quartile),
            filter_country: $scope.search.country
          }
        };
        $http.get('http://83.220.174.161:9202/pmc/articles/' + $scope.search.text, conf)
          .then(function success(response) {
            $scope.total = response.data.total.value;
            $scope.hits = response.data.hits;
            $scope.arrayModels = [];
            response.data.hits.forEach(function(element) {
              const source = element._source;
              const obj = new ModelPMC(source.journal, source.PMID, source.PMCID, source.DOI, source.Title, source.Author, source.date, source.date_epub, source.Abstract, source.Text_full, source.Glossary, source.Categories, source.Affiliations, source.book, source.Ref_ids, source.References);
              $scope.arrayModels.push(obj);
            });
            console.log("Ajax status: " + response.status);
          }, function error(response) {
            $scope.total = 0;
            $scope.hits = [];
            console.log("Ajax status: " + response.status);
          });
      }
    };
  }])
  .controller('FormPubmedController', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    
    $scope.Title = "Локальный поиск PubMed";
    $scope.TemplateURL = 'view/link_pubmed.html'
    
    $scope.search = {
      quartile: '',
      text: '',
      country: ''
    };
    
    $http.get('js/app/countries.json').then(function (response) {
      $scope.countries = response.data;
    });
    
    $scope.save = function (answer, answerForm) {
      if (answerForm.$valid) {
        var conf = {
          params: {
            filter_quartile: getNumberOr0($scope.search.quartile),
            filter_country: $scope.search.country
          }
        };
        $http.get('http://83.220.174.161:9202/pubmed/articles/' + $scope.search.text, conf)
          .then(function success(response) {
            $scope.total = response.data.total.value;
            $scope.hits = response.data.hits;
            $scope.arrayModels = [];
            response.data.hits.forEach(function(element) {
              const source = element._source;
              const obj = new ModelPubMed(source.MedlineCitation, source.PubmedData, source.DateEntrez);
              $scope.arrayModels.push(obj);
            });
            console.log("Ajax status: " + response.status);
          }, function error(response) {
            $scope.total = 0;
            $scope.hits = [];
            console.log("Ajax status: " + response.status);
          });
      }
    };
  }])
  .controller('PmcIdController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    'use strict';

    const id = $routeParams.id;
    
    $http.get('http://83.220.174.161:9202/pmc/article/' + id)
      .then(function success(response) {
        const source = response.data;
        const obj = new ModelPMC(source.journal, source.PMID, source.PMCID, source.DOI, source.Title, source.Author, source.date, source.date_epub, source.Abstract, source.Text_full, source.Glossary, source.Categories, source.Affiliations, source.book, source.Ref_ids, source.References);
        $scope.model = obj;
        console.log("Ajax status: " + response.status);
      }, function error(response) {
        $scope.model = new ModelPMC();
        console.log("Ajax status: " + response.status);
      });
  }])
  .controller('PubMedIdController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    'use strict';

    const id = $routeParams.id;
    
    $http.get('http://83.220.174.161:9202/pubmed/article/' + id)
      .then(function success(response) {
        const source = response.data;
        const obj = new ModelPubMed(source.MedlineCitation, source.PubmedData, source.DateEntrez);
        $scope.model = obj;
        console.log("Ajax status: " + response.status);
      }, function error(response) {
        $scope.model = new ModelPubMed();
        console.log("Ajax status: " + response.status);
      });
  }]);