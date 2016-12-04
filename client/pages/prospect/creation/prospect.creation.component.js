angular.module('Assur').directive('prospectCreation', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/prospect/creation/prospect.creation.html',
    controllerAs: 'prospectCreation',
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);
      
      this.create = (prospect) => {
        var _data = {
          nom : prospect.nom,
          contact : prospect.contact,
          email : prospect.email,
          telephone : prospect.telephone,
          siret : prospect.siret,
          rdv1 : prospect.rdv1,
          rdv2 : prospect.rdv2,
          potentiel : prospect.potentiel,
          commentaire : prospect.commentaire,
          prospect : true
        };
        console.debug(_data);
        HTTP.post("/clients/", {data: _data}, function(err, res) {
          console.debug(err, res);
        });
      };
    }
  }
});