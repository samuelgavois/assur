angular.module('Assur').directive('prospectListe', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/client/liste/client.liste.html',
    controllerAs: 'prospectListe',
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);
      $scope.checkOnAllPages();
      
      $scope.isProspectListe = true;

      HTTP.get("/prospects", {}, function (err, res) {
        if (res.statusCode === 200) {
          console.debug(JSON.parse(res.content));
          $scope.clients = JSON.parse(res.content);
        } else {
          $scope.clients = [];
        }
      });

    }
  }
});