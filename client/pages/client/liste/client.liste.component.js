angular.module('Assur').directive('clientListe', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/client/liste/client.liste.html',
    controllerAs: 'clientListe',
    controller: function ($scope, $reactive, $location) {
      $reactive(this).attach($scope);
      $scope.checkOnAllPages();
      
      $scope.isProspectListe = false;

      HTTP.get("/clients", {}, function (err, res) {
        if (res.statusCode === 200) {
          console.debug(JSON.parse(res.content));
          $scope.clients = JSON.parse(res.content);
        } else {
          $scope.clients = [];
        }
      });

      this.goToClient = (id, event) => {
        if (event.type === "click") {
          console.log(id, event);
          $location.path("/client-detail/" + id);
        }
      };
    }
  }
});