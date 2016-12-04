angular.module('Assur').directive('screenTitle', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/screentitle/screentitle.html',
    controllerAs: 'screenTitle',
    replace: true,
    scope: {
      title: '@',
      icon: '@'
    },
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);


    }
  }
});