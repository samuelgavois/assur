angular.module('Assur').directive('immeubleListe', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/immeuble/liste/immeuble.liste.html',
    controllerAs: 'immeubleListe',
    controller: function ($scope, $reactive, $stateParams) {
      $reactive(this).attach($scope);
      $scope.checkOnAllPages();

      HTTP.get("/clients/" + $stateParams.id, {}, function (err, res) {
        if (res.statusCode === 200) {
          $scope.client = JSON.parse(res.content);
          console.debug($scope.client);
        } else {
          $scope.client = {};
        }
      });

      HTTP.get("/clients-immeubles/" + $stateParams.id, {}, function (err, res) {
        if (res.statusCode === 200) {
          $scope.immeubles = JSON.parse(res.content);
          console.debug($scope.immeubles);
          /*$scope.immeubles.map(function(elt) {

          });*/
        } else {
          $scope.immeubles = [];
        }
      });

    }
  }
});