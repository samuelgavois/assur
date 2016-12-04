angular.module('Assur').directive('clientCreation', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/client/detail/client.detail.html',
    controllerAs: 'clientCreation',
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);
      $scope.checkOnAllPages();
      
      $scope.mode = "C"; //CREATION

      this.create = (client) => {
        var _data = {
          nom : client.nom,
          contact : client.contact,
          email : client.email,
          telephone : client.telephone,
          siret : client.siret,
          rdv1 : client.rdv1,
          rdv2 : client.rdv2,
          potentiel : client.potentiel,
          commentaire : client.commentaire,
          prospect : false
        };
        HTTP.post("/clients/", {data: _data}, function(err, res) {
          console.debug(err, res);
        });
      };
    }
  }
});