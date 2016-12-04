angular.module('Assur').directive('dossiersList', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/dossiers-list/dossiers-list.html',
    controllerAs: 'dossiersList',
    controller: function ($scope, $reactive, UsersService) {
      $reactive(this).attach($scope);
      Session.set('menuSelected', 3);


      
      HTTP.get("/dossiers", {}, function (err, res) {
        if (res.statusCode === 200) {
          console.debug(JSON.parse(res.content));
          $scope.dossiers = JSON.parse(res.content);
        } else {
          $scope.dossiers = [];
        }
      });
      
      this.save = (_dossier) => {
        var _data = {
          name:_dossier.name, 
          address1:_dossier.address1,
          address2:_dossier.address2,
          postalcode:_dossier.postalcode,
          city:_dossier.city,
        };
        HTTP.put("/dossiers/" + _dossier._id, {data: _data}, function(err, res) {
          
        });
      };
    }
  }
});