angular.module('Assur').directive('utilisateurConnexion', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/utilisateur/connexion/utilisateur.connexion.html',
    controllerAs: 'utilisateurConnexion',
    controller: function ($scope, $reactive, $location) {
      $reactive(this).attach($scope);
      $scope.checkOnAllPages();
            
	  this.submit = (ev) => {
          if ($scope.user && $scope.user.email && $scope.user.password) {
            Meteor.loginWithPassword($scope.user.email, $scope.user.password, function(error){
                if (error) {
                    console.log(error);
                    if (error.error === 403 && error.reason === "Incorrect password") {
                        $scope.showErrorMessage(ev, "Le mot de passe saisi pour " + $scope.user.email + " est incorrect !");
                    } else if (error.error === 403 && error.reason === "User not found") {
                        $scope.showErrorMessage(ev, "L'utilisateur " + $scope.user.email + " n'existe pas !");
                    }
                } else {
                    Router.go("/home");
                }
            });
          } else {
              $scope.showErrorMessage(ev, "Vous devez obligatoirement saisir un email et un mot de passe !");
          }
      };
    }
  }
});