angular.module('Assur').directive('utilisateurListe', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/utilisateur/liste/utilisateur.liste.html',
    controllerAs: 'utilisateurListe',
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);
      $scope.checkOnAllPages();
      
      $scope.switch = {
        Commercial:true,
        Gestionnaire:true,
        Administrateur:false
      };

      HTTP.get("/utilisateurs", {}, function (err, res) {
        if (res.statusCode === 200) {
          console.debug(JSON.parse(res.content));
          $scope.utilisateurs = JSON.parse(res.content);
          $scope.utilisateurs.map(function(elt) {
            if (elt.role === role) {
              elt.isHide = !$scope.switch[elt.role];
            }
          });
        } else {
          $scope.utilisateurs = [];
        }
      });

      this.onSwitchChange = (role, switchState) => {
        $scope.utilisateurs.map(function(elt) {
          if (elt.role === role) {
            elt.isHide = !switchState;
          }
        });
      };
    }
  }
});