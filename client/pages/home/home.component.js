angular.module('Assur').directive('home', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/home/home.html',
    controllerAs: 'home',
    controller: function ($scope, $reactive, $stateParams) {
      $reactive(this).attach($scope);
      $scope.checkOnAllPages();

    }
  }
});