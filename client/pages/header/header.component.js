angular.module('Assur').directive('header', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/header/header.html',
    controllerAs: 'header',
    controller: function ($scope, $reactive, $mdSidenav, $mdDialog, $mdToast) {
      $reactive(this).attach($scope);

      this.toggleSidebarLeft = () => {
        $mdSidenav('sidebarleft').toggle().then(function () {
          console.log(Session.get('menuSelected'));
        });
      };

      //Vérifie si on peut faire un retour arrière avec l'historique du navigateur
      $scope.checkGoBack = function() {
        if (document.location.pathname === "/") {
          $scope.hasGoBack = false;
        } else {
          $scope.hasGoBack = true;
        }
      };
      
      $scope.showErrorMessage = function(ev, message) {
        $mdToast.show($mdToast.simple().textContent(message));

        /*$mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Problème lors de la connexion')
            .textContent(message)
            .ariaLabel('Alert Dialog Demo')
            .ok('OK')
            .targetEvent(ev)
        );*/
      };

      $scope.checkIfUserConnected = function() {
        if (Meteor.user() === null) {
          $scope.hasUserConnected = false;
          if (document.location.pathname !== "/login") {
            Router.go("/login");
          }
        } else {
          $scope.hasUserConnected = true;
          console.log(Meteor.user());
        }
      };

      //Retour arrière
      this.goBack = (index) => {
        history.go(index);
      };

      this.showUserInformation = () => {
        $mdToast.show({
          hideDelay   : 3000,
          position    : 'top right',
          templateUrl: 'client/pages/utilisateur/connexion/utilisateur.information.html',
          controllerAs: 'utilisateurInformation',
          controller: function ($scope, $reactive, $stateParams) {
            $reactive(this).attach($scope);
      
            this.closeToast = () => {
              $mdToast.hide()
            };

            this.logout = () => {
              if (meteor.user()) {
                Meteor.logout();
                Router.go("/home");
              }
            };
          }
        });
      }

      //Common function
      $scope.checkOnAllPages = function() {
        $scope.checkIfUserConnected();
        $scope.checkGoBack();
      };

      $scope.checkOnAllPages();
    }
  }
});