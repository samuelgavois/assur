angular.module('Assur').directive('clientDetail', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/client/detail/client.detail.html',
    controllerAs: 'clientDetail',
    controller: function ($scope, $reactive, $stateParams) {
      $reactive(this).attach($scope);
      $scope.checkOnAllPages();

      $scope.mode = "D"; //DETAIL
      
      HTTP.get("/clients/" + $stateParams.id, {}, function (err, res) {
        if (res.statusCode === 200) {
          console.debug(JSON.parse(res.content));
          $scope.client = JSON.parse(res.content);
        } else {
          $scope.client = {};
        }
      });

      this.update = (client) => {
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
        HTTP.put("/clients/" + client._id, {data: _data}, function(err, res) {
          console.debug(err, res);
        });
      };
    }
  }
});