angular.module('Assur').directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/pages/sidebar/sidebar.html',
    controllerAs: 'sidebar',
    controller: function ($scope, $reactive, $mdSidenav, $location) {
      $reactive(this).attach($scope);
      $scope.menuSelected = Session.get("menuSelected");

      $scope.items = [
        { name: 'Liste des clients', icon: 'account.svg', url:'/client-liste' },

        { name: 'Création d\'un prospect', icon: 'tag_faces.svg', url:'/prospect-creation' },
        { name: 'Liste des prospects', icon: 'timeline.svg', url:'/prospect-liste' },
        
        { name: 'Liste des utilisateurs', icon: 'identity.svg', url:'/utilisateur-liste' }
      ];
      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $location.path(clickedItem.url);
        $mdSidenav('sidebarleft').close();
      };

  	  this.closeSidebar = () => {
  	    $mdSidenav('sidebarleft').close();
  	  };
	  
    }
  }
});